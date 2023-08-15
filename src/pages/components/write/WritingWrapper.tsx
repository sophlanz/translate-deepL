import React from "react";
import GrammarCheck from "./GrammarCheck";
import { Configuration, OpenAIApi } from "openai";
import useFetchOpenAi from "@/pages/hooks/useFetchOpenAi";
interface Props {
  writeData: WriteData;
  grammarLang: string;
  setWriteData: React.Dispatch<React.SetStateAction<WriteData>>;
}
interface WriteData {
  textToCorrect: string;
  grammarCorrection: string;
  writingPrompt: string;
  prompt: boolean;
  grammarCheck: boolean;
}
interface UseFetchOpenAiResponse {
  apiData?: OpenAiApiResponse;
}
interface OpenAiApiResponse {
  data: {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: TextChoice[];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
}
interface TextChoice {
  text: string;
  index: number;
  logprobs: null;
  finish_reason: string;
}
export default function WritingWrapper(props: Props): JSX.Element {
  const { writeData, setWriteData, grammarLang } = props;
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
    <div className="writingWrapper">
      <div className="prompt">
        <button onClick={handleGetPrompt}>Generate Prompt</button>
        {writeData.prompt ? <p>{writeData.writingPrompt}</p> : null}
      </div>
      <div className="textWrapper">
        <textarea
          placeholder="Generate a prompt, write some text, and check your grammar! "
          onChange={(e) =>
            setWriteData((prevData) => ({
              ...prevData,
              textToCorrect: e.target.value,
            }))
          }
        />
      </div>
      <GrammarCheck
        writeData={writeData}
        setWriteData={setWriteData}
        grammarLang={grammarLang}
      />
    </div>
  );
}
