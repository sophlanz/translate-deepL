import axios,{ AxiosRequestConfig, AxiosError, Axios} from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
//response is SSE
async function handler(req: NextApiRequest, res:NextApiResponse):Promise<void> {

    console.log(req.query.newTranslation)
    console.log(req.query.voice)
    const options = {
      method: 'POST',
      url: 'https://play.ht/api/v2/tts',
      params: {format: 'event-stream'},
      headers: {
        accept: 'text/event-stream',
        'content-type': 'application/json',
        AUTHORIZATION: 'c2ff28df9f904e93981a29cf9fe5cb3a',
        'X-USER-ID': 'CDwIWESGJbhDXmUqO17BnhiJdiE2'
      },
      data: {
        text: req.query.newTranslation,
        voice: req.query.voice,
        quality: 'medium',
        output_format: 'mp3',
        speed: 1,
        sample_rate: 24000,
        seed: null,
        temperature: null
      }
    };
    
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        res.send(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
 

            
}
export default handler;
