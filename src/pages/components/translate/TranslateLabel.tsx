import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLanguage } from "@/pages/context/language-context";
import { useAudio } from "@/pages/context/audio-context";
import { useTranslation } from "@/pages/context/translation-context";
export default function TranslateLabel(): JSX.Element {
  const { translation, changeTranslation } = useTranslation();
  const [toBeTranslated, setToBeTranslated] = useState<string>("");
  const { changeAudioUrl } = useAudio();
  const [aiApiLanguage, setAiApiLanguage] = useState<string>("EN-US");
  const { language, voice } = useLanguage();
  let url = "https://ai-lengua.vercel.app/api";
  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:3000/api";
  }
  const convertAiApiLanguage = (language: string) => {
    switch (language) {
      case "English-US":
        setAiApiLanguage("EN-US");
        break;
      case "English-GB":
        setAiApiLanguage("EN-GB");
        break;
      case "Spanish":
        setAiApiLanguage("ES");
        break;
      case "French":
        setAiApiLanguage("FR");
        break;
      case "German":
        setAiApiLanguage("DE");
        break;
      case "Chinese":
        setAiApiLanguage("ZH");
        break;
      case "Japanese":
        setAiApiLanguage("JA");
        break;
      case "Korean":
        setAiApiLanguage("KO");
        break;
      default:
        setAiApiLanguage("EN-US");
    }
  };
  //translate and get audio
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    //get toTranslate and pass it through api
    fetchTranslation();
  };
  const fetchTranslation = async () => {
    try {
      console.log(aiApiLanguage);
      console.log(toBeTranslated);
      const urlDeepL = `https://api-free.deepl.com/v2/translate?auth_key=${process.env.NEXT_PUBLIC_DEEPL_AUTH_KEY}&text=${toBeTranslated}&target_lang=${aiApiLanguage}&preserve_formatting=1`;
      const responseDeepL = await fetch(urlDeepL);
      const dataDeepL = await responseDeepL.json();
      console.log(dataDeepL);
      const text = dataDeepL.translations[0].text;
      console.log(text);
      changeTranslation(text);
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
        url: `${url}/playht`,
        params: {
          translate: translation,
          voice,
        },
      })
      .then(async (response) => {
        //get data from response, parse JSON into an object
        const transcriptionId = response.data.transcriptionId;
        //delay to wait for the audio to be generated
        await delay(12000);
        // pass transcripID as a param
        await axios
          .request({
            url: `${url}/getAudio`,
            params: {
              transcriptionId,
            },
          })
          .then(async (response) => {
            const audioUrl = response.data.audioUrl;
            changeAudioUrl(audioUrl);
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
  }
  useEffect(() => {
    convertAiApiLanguage(language);
  }, [language]);
  return (
    <>
      <label htmlFor="textToTranslate">
        <textarea
          placeholder="The language will be detected, please start typing."
          id="textToTranslate"
          name="textToTranslate"
          value={toBeTranslated}
          onChange={(e) => setToBeTranslated(e.target.value)}
        />
      </label>
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </>
  );
}
