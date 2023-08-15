import React from "react";
import useFetchOpenAi from "@/pages/hooks/useFetchOpenAi";
interface Props {
  writeData: WriteData;
  setWriteData: React.Dispatch<React.SetStateAction<WriteData>>;
  grammarLang: string;
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
export default function GrammarCheck(props: Props): JSX.Element {
  const { writeData, setWriteData, grammarLang } = props;
  const prompt = `Correct this to standard ${grammarLang}:\n\n${writeData.textToCorrect}`;
  const data: UseFetchOpenAiResponse = useFetchOpenAi({ prompt });
  //call api with text to be translated;
  const handleCheckGrammar = async () => {
    try {
      if (data && data.apiData) {
        setWriteData((prevData) => ({
          ...prevData,
          grammarCorrection: data.apiData
            ? data.apiData.data.choices[0].text
            : "Oops, there's been an error",
          grammarCheck: true,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grammarCheck">
      <button onClick={handleCheckGrammar}>Check Grammar</button>
      {writeData.grammarCheck ? <p>{writeData.grammarCorrection}</p> : null}
    </div>
  );
}
