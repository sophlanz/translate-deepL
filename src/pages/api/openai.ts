import axios,{ AxiosRequestConfig} from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";
import type { OpenAiApiResponse } from '../../components/write/types.write';
async function handler (req:NextApiRequest, res:NextApiResponse): Promise<void>{
//openAI
const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role:"user",content:`${req.query.prompt}`}],
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  .then((response)=>{
/*     console.log(response) */
    res.status(200).send(response.data);
    res.end();
  })
  .catch((error)=>{
    res.send(error);
})
}
export default handler;
