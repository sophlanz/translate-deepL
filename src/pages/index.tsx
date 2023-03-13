import Head from 'next/head'
import React, { useState,useEffect} from 'react'
import axios from 'axios'
import { Configuration, OpenAIApi } from 'openai'

export default function Home() {
  const authKey:string = process.env.DEEPL_AUTH_KEY as string;
  const [toTranslate, setToTranslate] = useState<string>('');
  const [translation, setTranslation]= useState<string>('');
  const[targetLanguage,setTargetLanguage] = useState<string>('EN-US');
  const[audioUrl,setAudioUrl] = useState<string>('')
  const[transcriptionId,setTranscriptionId] = useState<string>('');
  const [textToCorrect,setTextToCorrect] = useState<string>('');
  const [grammarCorrection,setGrammarCorrection] = useState<any>();
  const [grammarLang,setGrammarLang] = useState<string>('');
  const [voice,setVoice]=useState<string>('en-US-SaraNeural');
 
  //openAI
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  //call api with text to be translated;
  const handleCheckGrammar = async () =>{
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Correct this to standard ${grammarLang}:\n\n${textToCorrect}`,
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
      console.log(targetLanguage)
      const urlDeepL = `https://api-free.deepl.com/v2/translate?auth_key=${authKey}&text=${toTranslate}&target_lang=${targetLanguage}&preserve_formatting=1`;
      console.log(targetLanguage)
      const responseDeepL = await fetch(urlDeepL);
      console.log(responseDeepL);
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
   //time out for waiting for audio generation 
   const delay = (ms:number) => {
    return new Promise (resolve => setTimeout(resolve,ms))
  };
    console.log(voice)
    console.log(translation)
      //remove all of the "?" or the url will be invalid
        const urlTranslation = translation.replace(/[?]/g, "")
       await axios.get(`http://127.0.0.1:5000/audio/${urlTranslation}/${voice}`)
        .then(async(response)=> {
          //get data from response, parse JSON into an object
                const transcriptionData = await JSON.parse(response.data);
                //delay to wait for the audio to be generated
                await delay(11000);
                 // pass transcripID as a param
                await axios.get(`http://127.0.0.1:5000/getAudio/${transcriptionData.transcriptionId}`)
                .then(async (response)=> {
                      const audioData = JSON.parse(response.data);
                      console.log(audioData)
                      setAudioUrl(audioData.audioUrl);
              })
              .catch((error)=> {
                console.log(error.message)
              }); 
        })
      };
  //set text for grammar to be checked
  const handleChangeText = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextToCorrect(event.target.value)
  }
  //set target lang
  const handleSelectLang = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setTargetLanguage(event.target.value);
    console.log(event.target.value)
    switch(event.target.value) {
      case"EN-US":
        setGrammarLang("English-US")
        setVoice('en-US-SaraNeural')
        break;
      case"EN-GB":
        setGrammarLang("English-GB")
        setVoice("en-GB-RyanNeural")
        break;
      case"ES":
        setGrammarLang("Spanish")
        setVoice("es-US-PalomaNeural")
        break;
      case"FR":
        setGrammarLang("French")
        setVoice('fr-BE-GerardNeural')
        break;
      case"DE":
        setGrammarLang("German")
        setVoice("de-DE-ConradNeural")
        break;
      case"ZH":
        setGrammarLang("Chinese")
        setVoice('zh-CN-XiaoxuanNeural')
        break;
      case"JA":
        setGrammarLang("Japanese")
        setVoice("ja-JP-NanamiNeural")
        break;
      case"KO":
        setGrammarLang("Korean")
        setVoice('ko-KR-InJoonNeural')
        break;
        default:
          setGrammarLang("English")
          setVoice('en-US-SaraNeural')
    }
    console.log(voice);
  }
  useEffect(() => {
    console.log(transcriptionId);
 }, [transcriptionId]);
   return (
    <>
      <Head>
          <h1>Translate</h1>
      </Head>
     <select className="targetLang" value={targetLanguage} onChange={handleSelectLang} >
        <option value="EN-US">English-US</option>
        <option value="EN-GB">English-GB</option>
        <option value="ES">Spanish</option>
        <option value="FR">French</option>
        <option value="DE">German</option>
        <option value="ZH">Chinese</option>
        <option value="JA">Japanese</option>
        <option value="KO">Korean</option>
     </select>
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
