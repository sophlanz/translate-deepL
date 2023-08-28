import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useLanguage } from "@/context/language-context";
import { useAudio } from "@/context/audio-context";
import { useTranslation } from "@/context/translation-context";
import ErrorMessage from "../errors/ErrorMessage";
enum Status {
  Idle,
  Loading,
  Error,
}
export default function TranslateLabel(): JSX.Element {
  const { translation, changeTranslation } = useTranslation();
  const [newTranslation, setNewTranslation] = useState<string>("");
  const [toBeTranslated, setToBeTranslated] = useState<string>("");
  const { changeAudioUrl, audioGenerationStatus, updateAudioGenerationStatus } =
    useAudio();
  const [aiApiLanguage, setAiApiLanguage] = useState<string>("EN-US");
  const { language, voice } = useLanguage();
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [error, setError] = useState<Error | undefined>(undefined);

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
    setStatus(Status.Loading);
    fetch(
      `https://api-free.deepl.com/v2/translate?auth_key=${process.env.NEXT_PUBLIC_DEEPL_AUTH_KEY}&text=${toBeTranslated}&target_lang=${aiApiLanguage}&preserve_formatting=1`
    ).then(async (response) => {
      const dataDeepL = await response.json();
      const translationData = dataDeepL.translations[0].text;
      changeTranslation(translationData);
      setNewTranslation(translationData);
      setStatus(Status.Idle);
    });
  };
  const handleV2VoiceData = (data: string) => {
    const urlRegex = /"url":"([^"]+)"/;
    // Search for the URL within the string
    const match = data.match(urlRegex);
    if (match && match[1]) {
      const url = match[1];
      //update context
      changeAudioUrl(url);
      updateAudioGenerationStatus(Status.Idle);
    } else {
      console.log("Audio URL not found.");
    }
  };
  const handleV1VoiceData = (response: AxiosResponse<any, any>) => {
    const transcriptionId = response.data.transcriptionId;
    //call interval every 5 seconds until audio is ready
    const interval = setInterval(() => {
      axios
        .request({
          url: `${url}/getAudio`,
          params: {
            transcriptionId,
          },
        })
        .then((response) => {
          if (response.data.audioUrl !== undefined) {
            const url = response.data.audioUrl;
            //update context
            changeAudioUrl(url);
            updateAudioGenerationStatus(Status.Idle);
            clearInterval(interval);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 5000);
  };
  async function handleVoice() {
    setStatus(Status.Loading);
    updateAudioGenerationStatus(Status.Loading);
    try {
      const response = await axios.request({
        url:
          //the v2 endpoint only works with english
          aiApiLanguage === "EN-US" || aiApiLanguage === "EN-GB"
            ? `${url}/playhtv2`
            : `${url}/playhtv1`,
        params: {
          newTranslation,
          voice,
        },
      });
      //handle v2 response
      if (aiApiLanguage === "EN-US" || aiApiLanguage === "EN-GB") {
        handleV2VoiceData(response.data);
      } else {
        handleV1VoiceData(response);
      }
      //handle v1 response
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      }
      console.log(error);
      setStatus(Status.Error);
    }
  }
  //when we have a new translation, get new audio
  useEffect(() => {
    if (newTranslation !== "") {
      handleVoice();
    }
  }, [newTranslation]);
  //when we change the language, update context
  useEffect(() => {
    convertAiApiLanguage(language);
  }, [language]);
  if (status === Status.Error) {
    return <ErrorMessage error={error} />;
  }
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
