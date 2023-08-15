import React from "react";
import GrammarCheck from "./GrammarCheck";
import { Configuration, OpenAIApi } from "openai";
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
  //openAI
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
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
  //openAI get writing prompt
  const handleGetPrompt = async () => {
    try {
      const response = (await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Give me a unique prompt about ${
          topics[Math.floor(Math.random() * topics.length)]
        }  in ${grammarLang} to help spark writing ideas :\n`,
        temperature: 0,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })) as OpenAiApiResponse;
      if (
        response.data?.choices &&
        response.data.choices.length > 0 &&
        response.data.choices[0].text !== undefined
      ) {
        setWriteData((prevData) => ({
          ...prevData,
          writingPrompt: response.data.choices[0].text.toString(),
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
