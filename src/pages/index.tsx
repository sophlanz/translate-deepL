import Head from 'next/head'
import React, {ReactNode, useState,useEffect} from 'react'
import axios from 'axios'
import { Configuration, OpenAIApi } from 'openai'

export default function Home() {
  const authKey:string = process.env.DEEPL_AUTH_KEY as string;
  const [toTranslate, setToTranslate] = useState<string>('');
  const [translation, setTranslation]= useState<string>('');
  const[audioUrl,setAudioUrl] = useState<string>('')
  const[transcriptionId,setTranscriptionId] = useState<string>('');
  const [textToCorrect,setTextToCorrect] = useState<string>('');
  const [grammarCorrection,setGrammarCorrection] = useState<any>();
  //openAI
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  //call api with text to be translated;
  const handleCheckGrammar = async () =>{
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Correct this to standard Spanish:\n\n${textToCorrect}`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text);

    setGrammarCorrection(response.data.choices[0].text);

  }
 

  //translate data
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
  //save  text to be transalted to state
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
      setToTranslate(event.target.value)
  };
  //generate and retreive audio of translation being read
  async function handleVoice() {
        axios.get(`http://127.0.0.1:5000/audio/${translation}`)
        .then((response)=> {
          //get data from response, parse JSON into an object
                const transcriptionData = JSON.parse(response.data);
                //get id of transcription audio
                const transcriptionId = transcriptionData.transcriptionId
                setTranscriptionId(transcriptionId)
              }).then(()=> {
                //get audio from api, pass transcripID as a param
                axios.get(`http://127.0.0.1:5000/getAudio/${transcriptionId}`)
                .then((response)=> {
                      const audioData = JSON.parse(response.data)
                      const audioUrl = audioData.audioUrl
                      setAudioUrl(audioUrl);
                })
              })
              .catch((error)=> {
                console.log(error.message)
              }); 
        };
  //set text for grammar to be checked
  const handleChangeText = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextToCorrect(event.target.value)
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
      <audio controls src={audioUrl}> Your browser does not support the
      <code>audio</code> element.
      </audio>
      <textarea rows={20} cols={50} onChange = {handleChangeText}/>
      <p>{grammarCorrection}</p>
      <button onClick={handleCheckGrammar}/>
    </>
  )
}
