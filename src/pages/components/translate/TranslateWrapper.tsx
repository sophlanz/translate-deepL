import React from "react";
import axios from "axios";
interface Props {
  translationData: TranslationData;
  setTranslationData: React.Dispatch<React.SetStateAction<TranslationData>>;
}
interface TranslationData {
  toTranslate: string;
  translation: string;
  targetLanguage: string;
  grammarLang: string;
  audioUrl: string;
  voice: string;
  loggedIn: boolean;
}
export default function TranslateWrapper(props: Props): JSX.Element {
  const { translationData, setTranslationData } = props;
  const url = {
    prod: "https://ai-lengua.vercel.app/api",
    dev: "http://localhost:3000/api",
  };
  const env = process.env.NODE_ENV;
  //set target lang
  const handleSelectLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTranslationData((prevData) => ({
      ...prevData,
      targetLanguage: event.target.value,
    }));
    switch (event.target.value) {
      case "EN-US":
        setTranslationData((prevData) => ({
          ...prevData,
          grammarLang: "English-US",
          voice: "en-US-SaraNeural",
        }));
        break;
      case "EN-GB":
        setTranslationData((prevData) => ({
          ...prevData,
          grammarLang: "English-GB",
          voice: "en-GB-RyanNeural",
        }));
        break;
      case "ES":
        setTranslationData((prevData) => ({
          ...prevData,
          grammarLang: "Spanish",
          voice: "es-US-PalomaNeural",
        }));
        break;
      case "FR":
        setTranslationData((prevData) => ({
          ...prevData,
          grammarLang: "French",
          voice: "fr-BE-GerardNeural",
        }));
        break;
      case "DE":
        setTranslationData((prevData) => ({
          ...prevData,
          grammarLang: "German",
          voice: "de-DE-ConradNeural",
        }));
        break;
      case "ZH":
        setTranslationData((prevData) => ({
          ...prevData,
          grammarLang: "Chinese",
          voice: "zh-CN-XiaoxuanNeural",
        }));
        break;
      case "JA":
        setTranslationData((prevData) => ({
          ...prevData,
          grammarLang: "Japanese",
          voice: "ja-JP-NanamiNeural",
        }));
        break;
      case "KO":
        setTranslationData((prevData) => ({
          ...prevData,
          grammarLang: "Korean",
          voice: "ko-KR-InJoonNeural",
        }));
        break;
      default:
        setTranslationData((prevData) => ({
          ...prevData,
          grammarLang: "English",
          voice: "en-US-SaraNeural",
        }));
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
      const urlDeepL = `https://api-free.deepl.com/v2/translate?auth_key=${process.env.NEXT_PUBLIC_DEEPL_AUTH_KEY}&text=${translationData.toTranslate}&target_lang=${translationData.targetLanguage}&preserve_formatting=1`;
      const responseDeepL = await fetch(urlDeepL);
      const dataDeepL = await responseDeepL.json();
      const text = dataDeepL.translations[0].text;
      setTranslationData((prevData) => ({
        ...prevData,
        text,
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
      <div className="translate">
        <div className="selectWrapper">
          <h2>TRANSLATE TO : </h2>
          <select
            className="targetLang"
            value={translationData.targetLanguage}
            onChange={handleSelectLang}
          >
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
        <label htmlFor="textToTranslate">
          <textarea
            placeholder="The language will be detected, please start typing."
            onChange={(e) =>
              setTranslationData((prevData) => ({
                ...prevData,
                toTranslate: e.target.value,
              }))
            }
          />
        </label>
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </div>
      <div className="translate">
        <h2 className="translation">TRANSLATION </h2>
        <p>{translationData.translation}</p>
        <div className="translationAudio">
          <audio controls src={translationData.audioUrl}>
            {" "}
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
      </div>
    </div>
  );
}
