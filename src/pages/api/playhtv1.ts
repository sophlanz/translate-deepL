import axios,{ AxiosRequestConfig} from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res:NextApiResponse):Promise<void> {
    console.log(req.query.newTranslation)
    const data: AxiosRequestConfig = {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: process.env.NEXT_PUBLIC_PLAYHT_AUTH_KEY,
        'X-User-Id': process.env.NEXT_PUBLIC_PLAYHT_USER_ID,
      },
      data: {
        content: [req.query.newTranslation],
        voice: req.query.voice,
      },
      url: 'https://play.ht/api/v1/convert',
      method: 'post',
    };
    await axios.request(data)
      .then((results) => {
        res.status(results.status).send(results.data)
        res.end()
      })
      .catch((error) => {
        res.status(error.status).send(error.response.data)
      })
            
}
export default handler;