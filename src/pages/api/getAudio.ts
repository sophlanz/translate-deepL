import axios,{ AxiosRequestConfig} from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res:NextApiResponse):Promise<void> {
    console.log(req.query.transcriptionId)
    const data: AxiosRequestConfig = {
      headers: {
        accept: 'text/event-stream',
        'content-type': 'application/json',
        Authorization: process.env.NEXT_PUBLIC_PLAYHT_AUTH_KEY,
        'X-User-Id': process.env.NEXT_PUBLIC_PLAYHT_USER_ID,
      },
      url: `https://play.ht/api/v1/articleStatus?transcriptionId=${req.query.transcriptionId}`,
      method: 'get',
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