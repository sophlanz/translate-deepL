import Head from 'next/head'
import * as deepl from 'deepl-node'
import React, {useState} from 'react'

export default function Home() {
  const authKey:string = process.env.REACT_APP_AUTH_KEY as string;
  const translator = new deepl.Translator(authKey);
  const [toTranslate, setToTranslate] = useState<string>('');
  const [translation, setTranslation]= useState<string>('');
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

 
  return (
    <>
      <Head>
          <h1>Translate</h1>
      </Head>
      <form onSubmit={handleSubmit}>
        <label>
          Translate:
          <textarea onChange ={handleChange}   />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>{translation}</p>
      
      
     
    </>
  )
}
