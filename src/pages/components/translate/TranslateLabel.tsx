import React from "react";
import axios from "axios";
import { TranslateLabelProps as Props } from "./types.translate";
export default function TranslateLabel(props: Props): JSX.Element {
  const { translationData, setTranslationData, targetLanguage } = props;
  const url = {
    prod: "https://ai-lengua.vercel.app/api",
    dev: "http://localhost:3000/api",
  };
  const env = process.env.NODE_ENV;
  //translate and get audio
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
            console.log(audioData);
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
    <>
      <label htmlFor="textToTranslate">
        <textarea
          placeholder="The language will be detected, please start typing."
          id="textToTranslate"
          name="textToTranslate"
          value={translationData.toTranslate}
          onChange={(e) =>
            setTranslationData((prevData) => ({
              ...prevData,
              toTranslate: e.target.value,
            }))
          }
        />
      </label>
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </>
  );
}
