import Head from 'next/head'
import React, { useState,useEffect} from 'react'
import axios from 'axios'
import { Configuration, OpenAIApi } from 'openai'
import prisma from '../../prisma/lib/prisma';
import Header from '../pages/components/Header'
import Image from 'next/image';

export default function Home() {
  const authKey:string = process.env.DEEPL_AUTH_KEY as string;
  console.log(authKey)
  const [toTranslate, setToTranslate] = useState<string>('');
  const [translation, setTranslation]= useState<string>('');
  const[targetLanguage,setTargetLanguage] = useState<string>('EN-US');
  const[audioUrl,setAudioUrl] = useState<string>('english')
  const [textToCorrect,setTextToCorrect] = useState<string>('');
  const [grammarCorrection,setGrammarCorrection] = useState<any>();
  const [grammarLang,setGrammarLang] = useState<string>('English-US');
  const [voice,setVoice]=useState<string>('en-US-SaraNeural');
 const[writingPrompt,setWritingPrompt] = useState<any>()
 const [wordOfDay, setWordOfDay] = useState<any>();
 const [wordOfDayDefinition,setWordOfDayDefinition] = useState<any>();
 const [showDefinition, setShowDefinition] = useState<boolean>(false);
 const [grammarCheck, setGrammarCheck] = useState<boolean>(false);
 const [prompt, setPrompt] = useState<boolean>(false);
 const[loggedIn, setLoggedIn] = useState<boolean>(false);
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
    setGrammarCheck(true)

  }
  //translate data
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    //get toTranslate and pass it through api
    (async () => {
      const urlDeepL = `https://api-free.deepl.com/v2/translate?auth_key=${authKey}&text=${toTranslate}&target_lang=${targetLanguage}&preserve_formatting=1`;
      console.log(targetLanguage,toTranslate)
      const responseDeepL = await fetch(urlDeepL);
      console.log(responseDeepL);
      const dataDeepL = await responseDeepL.json();
      console.log(dataDeepL)
      const text = dataDeepL.translations[0].text
      console.log(text);
      setTranslation(text)
      handleVoice();
  })()
  }


  //generate and retreive audio of translation being read
  async function handleVoice() {
   //time out for waiting for audio generation 
   const delay = (ms:number) => {
    return new Promise (resolve => setTimeout(resolve,ms))
  };
      //remove all of the "?" or the url will be invalid
        const urlTranslation = translation.replace(/[?]/g, "")
      console.log(urlTranslation)
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
  const topics = ['the enviorment', 'people', 'life', 'society', 'daily life', 'life reflections', 'friend reflections',
                'gratefulness', 'love', 'friendship', 'resilience', 'confidence', 'aspirations', 'dreams', 'goals']
  //openAI get writing prompt
 const handleGetPrompt = async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Give me a unique prompt about ${topics[Math.floor(Math.random()*topics.length)]}  in ${grammarLang} to help spark writing ideas :\n`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  setWritingPrompt(response.data.choices[0].text);
  setPrompt(true);
 }
 const wordTopics = [ 'literary', 'coloquial', 'formal', 'informal', 'fun', 'intense', 'light']
 
 const getWordDefinition = async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Tell me in  ${grammarLang} the definition of $ ${wordOfDay} , and use it in a sentence:\n`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  setWordOfDayDefinition(response.data.choices[0].text);
  setShowDefinition(!showDefinition)
 }
 useEffect(()=> {
  //get random word in target laguage
 const getWordOfDay = async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Give me a unique random advanced ${wordTopics[Math.floor(Math.random()*wordTopics.length)]} word in ${grammarLang} :\n`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  setWordOfDay(response.data.choices[0].text);
 }
 getWordOfDay();
 },[targetLanguage])
   return (
    <div className="homepage">
    
      <Header  sendToParent={setLoggedIn} />
      <div className='wordOfDay'>
          <h1>Word Of The Day</h1>
          <div><h2>{wordOfDay}</h2><Image  onClick={getWordDefinition} alt="search" src='/images/search.png' height="20" width="20"></Image></div>
          {showDefinition?
          <p>{wordOfDayDefinition}</p> :
          null
          }
      </div>
      <div className="translateWrapper" style={{marginTop:loggedIn ? "-200px" : "75px"}}>
          <div className="translate">
             <div className="selectWrapper">
                  <h2>TRANSLATE TO : </h2> 
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
              </div>
                   <label htmlFor='textToTranslate'>
                     <textarea placeholder='The language will be detected, please start typing.' onChange ={(e)=> setToTranslate(e.target.value)}   />
                   </label>
                   <button onClick={(e)=>handleSubmit(e)}>Submit</button>
          </div>
          <div className="translate">
                  <h2 className="translation">TRANSLATION </h2>
                 <p>{translation}</p>
                 <div className="translationAudio">
                    <audio controls src={audioUrl}> Your browser does not support the
                    <code>audio</code> element.
                    </audio>
                 </div>
                
          </div>
      </div>
      <div className="writingWrapper">
          <div className="prompt">
              <button onClick={handleGetPrompt}>Generate Prompt</button>
              {prompt ?
              <p>{writingPrompt}</p> :
              null
              }
          </div>
          <div className="textWrapper">
            <textarea placeholder="Generate a prompt, write some text, and check your grammar! " onChange = {(e)=> setTextToCorrect(e.target.value)}/>
          </div>
          <div className="grammarCheck">
             <button onClick={handleCheckGrammar}>Check Grammar</button>
             { grammarCheck ? 
              <p>{grammarCorrection}</p>
              :
              null
             }
            
          </div>
          
      </div>
    </div>
  )
}
