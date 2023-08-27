import axios from 'axios'
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
        AUTHORIZATION: process.env.NEXT_PUBLIC_PLAYHT_AUTH_KEY,
        'X-User-Id': process.env.NEXT_PUBLIC_PLAYHT_USER_ID
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
        res.send(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
        
}
export default handler;
