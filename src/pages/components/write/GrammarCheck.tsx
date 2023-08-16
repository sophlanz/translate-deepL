import React from "react";
import useFetchOpenAi from "@/pages/hooks/useFetchOpenAi";
import { GrammarCheckProps as Props } from "./types.write";
import { UseFetchOpenAiResponse } from "./types.write";

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
