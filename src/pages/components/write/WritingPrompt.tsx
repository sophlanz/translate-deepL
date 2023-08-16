import React from "react";
import useFetchOpenAi from "@/pages/hooks/useFetchOpenAi";
import {
  WritingPromptProps as Props,
  UseFetchOpenAiResponse,
} from "./types.write";
export default function WritingPrompt(props: Props): JSX.Element {
  const { grammarLang, promptBoolean, setWriteData, writeData } = props;
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
  }  in ${grammarLang} to help spark writing ideas :\n`;
  //Get prompt from api
  let data: UseFetchOpenAiResponse = useFetchOpenAi({ prompt });
  //openAI get writing prompt
  const handleGetPrompt = async () => {
    try {
      if (data && data.apiData) {
        setWriteData((prevData) => ({
          ...prevData,
          writingPrompt: data.apiData
            ? data.apiData.data.choices[0].text.toString()
            : "Oops, there's been an error",
          prompt: true,
        }));
      }
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
