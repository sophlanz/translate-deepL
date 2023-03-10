import Head from 'next/head'
import * as deepl from 'deepl-node'
import React, {useState} from 'react'

export default function Home() {
  const authKey:string = process.env.DEEPL_AUTH_KEY as string;
  const authKey_playht:string = process.env.PLAYHT_AUTH_KEY as string;
  const userid_playht:string = process.env.PLAYHT_USER_ID as string; 
  const [toTranslate, setToTranslate] = useState<string>('');
  const [translation, setTranslation]= useState<string>('');
  const[audio,setAudio] = useState<string>('')
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //get toTranslate and pass it through api
    (async () => {
      const urlDeepL = 'https://api-free.deepl.com/v2/translate?auth_key='+authKey+'&text='+toTranslate+'&target_lang='+'es'+'&preserve_formatting=1';
      const responseDeepL = await fetch(urlDeepL);
      const dataDeepL = await responseDeepL.json();
      const text = dataDeepL.translations[0].text
      setTranslation(text)
  })()
  }
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    
    event.preventDefault();
      setToTranslate(event.target.value)
  }
  async function handleVoice() {
    
   /*    const url = "https://play.ht/api/v1/convert"
      const payload = {
        "voice": "en-US-MichelleNeural",
        "content": translation,
         "title": "Testing public api convertion"
      }
      const headers = {
        'Authorization': authKey_playht,
        'X-User-ID': userid_playht,
        'Content-Type': 'application/json'
      }
      const response = await (await fetch(url,{
        'method':"POST",
        'headers':headers,
        'body':JSON.stringify(payload)
      }))
      setAudio(response.url)
      console.log(response)
      console.log(response) */
      return new Promise(async (resolve, reject) => {
        try {
          const response = await (await fetch('https://play.ht/api/v1/convert', {
            method: 'POST',
            headers: {
              'Authorization': authKey,
              'X-User-ID': userid_playht,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "voice": "en-US-MichelleNeural",
              "content": toTranslate,
              "title": "Testing Italian api convertion"
            })
          })).json();
          console.log(response)
          const mp3Url = `
          https://media.play.ht/full_${response.transcriptionId}.mp3`;
          console.log(mp3Url);
          while(true) {
            console.log(`trying again...`);
            if((await fetch(mp3Url)).status === 200) {
             let snd = new Audio(mp3Url);
              snd.play();
              snd.onended = resolve;
              break;
            }
          }
        } catch (err) {
          reject(err);
        }
      });
    
        }
 
 
  return (
    <>
      <Head>
          <h1>Translate</h1>
      </Head>
      <form onSubmit={handleSubmit}>
        <label>
          Translate:
          <textarea rows={20} cols={50} onChange ={handleChange}   />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>{translation}</p>
      <button onClick={handleVoice}>Read Translation</button> 
      <audio controls src={audio}> Your browser does not support the
      <code>audio</code> element.
      </audio>
    </>
  )
}
