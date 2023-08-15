import React from "react";
import axios from "axios";
import Translate from "./Translate";
import Translation from "./Translation";
interface Props {
  translationData: TranslationData;
  setTranslationData: React.Dispatch<React.SetStateAction<TranslationData>>;
  targetLanguage: string;
  setGrammarLang: React.Dispatch<React.SetStateAction<string>>;
  setTargetLanguage: React.Dispatch<React.SetStateAction<string>>;
}
interface TranslationData {
  toTranslate: string;
  translation: string;
  audioUrl: string;
  voice: string;
  loggedIn: boolean;
}
export default function TranslateWrapper(props: Props): JSX.Element {
  const {
    translationData,
    setTranslationData,
    targetLanguage,
    setGrammarLang,
    setTargetLanguage,
  } = props;
  const url = {
    prod: "https://ai-lengua.vercel.app/api",
    dev: "http://localhost:3000/api",
  };
  const env = process.env.NODE_ENV;
  //set target lang
  const handleSelectLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetLanguage(event.target.value);
    switch (event.target.value) {
      case "EN-US":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "en-US-SaraNeural",
        }));
        setGrammarLang("English-US");
        break;
      case "EN-GB":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "en-GB-RyanNeural",
        }));
        setGrammarLang("English-GB");
        break;
      case "ES":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "es-US-PalomaNeural",
        }));
        setGrammarLang("Spanish");
        break;
      case "FR":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "fr-BE-GerardNeural",
        }));
        setGrammarLang("French");
        break;
      case "DE":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "de-DE-ConradNeural",
        }));
        setGrammarLang("German");
        break;
      case "ZH":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "zh-CN-XiaoxuanNeural",
        }));
        setGrammarLang("Chinese");
        break;
      case "JA":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "ja-JP-NanamiNeural",
        }));
        setGrammarLang("Japanese");
        break;
      case "KO":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "ko-KR-InJoonNeural",
        }));
        setGrammarLang("Korean");
        break;
      default:
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "en-US-SaraNeural",
        }));
        setGrammarLang("English");
    }
  };
  //translate data
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    //get toTranslate and pass it through api
    fetchTranslation();
  };
  const fetchTranslation = async () => {
    try {
      const urlDeepL = `https://api-free.deepl.com/v2/translate?auth_key=${process.env.NEXT_PUBLIC_DEEPL_AUTH_KEY}&text=${translationData.toTranslate}&target_lang=${targetLanguage}&preserve_formatting=1`;
      const responseDeepL = await fetch(urlDeepL);
      const dataDeepL = await responseDeepL.json();
      const text = dataDeepL.translations[0].text;
      setTranslationData((prevData) => ({
        ...prevData,
        translation: text,
      }));
      handleVoice();
    } catch (error) {
      console.log(error);
    }
  };
  //generate and retreive audio of translation being read
  async function handleVoice() {
    //time out for waiting for audio generation
    const delay = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    //remove all of the "?" or the url will be invalid
    // const urlTranslation = translation.replace(/[?]/g, "")

    axios
      .request({
        url: env === "development" ? `${url.dev}/playht` : `${url.prod}/playht`,
        params: {
          translate: translationData.translation,
          voice: translationData.voice,
        },
      })
      .then(async (response) => {
        //get data from response, parse JSON into an object
        const transcriptionData = response.data.transcriptionId;
        //delay to wait for the audio to be generated
        await delay(11000);
        // pass transcripID as a param
        await axios
          .request({
            url:
              env === "development"
                ? `${url.dev}/getAudio`
                : `${url.prod}/getAudio`,
            params: {
              transcriptionId: transcriptionData,
            },
          })
          .then(async (response) => {
            const audioData = response.data.audioUrl;
            setTranslationData((prevData) => ({
              ...prevData,
              audioUrl: audioData,
            }));
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
  }
  return (
    <div
      className="translateWrapper"
      style={{ marginTop: translationData.loggedIn ? "-200px" : "75px" }}
    >
      <Translate
        handleSelectLang={handleSelectLang}
        translationData={translationData}
        setTranslationData={setTranslationData}
        handleSubmit={handleSubmit}
        targetLanguage={targetLanguage}
      />
      <Translation
        translation={translationData.translation}
        audioUrl={translationData.audioUrl}
      />
    </div>
  );
}
