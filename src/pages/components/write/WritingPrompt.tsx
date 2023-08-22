import React from "react";
import useFetchOpenAi from "@/pages/hooks/useFetchOpenAi";
import { useLanguage } from "@/pages/context/language-context";
import {
  WritingPromptProps as Props,
  UseFetchOpenAiResponse,
} from "./types.write";
export default function WritingPrompt(props: Props): JSX.Element {
  const { promptBoolean, setWriteData, writeData } = props;
  const { language } = useLanguage();
  //Prompt topics
  const topics = [
    "the enviorment",
    "people",
    "life",
    "society",
    "daily life",
    "life reflections",
    "friend reflections",
    "gratefulness",
    "love",
    "friendship",
    "resilience",
    "confidence",
    "aspirations",
    "dreams",
    "goals",
  ];
  //prompt to send to api
  const prompt = `Give me a unique prompt about ${
    topics[Math.floor(Math.random() * topics.length)]
  }  in ${language} to help spark writing ideas :\n`;

  //openAI get writing prompt
  const handleGetPrompt = async () => {
    try {
      /*      useFetchOpenAi({ prompt, language }).then((response) => {
        const writingPrompt = response.content;
        setWriteData((prevData) => ({
          ...prevData,
          writingPrompt,
          prompt: true,
        }));
      }); */
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="prompt">
      <button onClick={handleGetPrompt}>Generate Prompt</button>
      {promptBoolean ? <p>{writeData.writingPrompt}</p> : null}
    </div>
  );
}
