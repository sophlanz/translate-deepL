import React from "react";
import useFetchOpenAi from "@/pages/hooks/useFetchOpenAi";
import { GrammarCheckProps as Props } from "./types.write";
import { UseFetchOpenAiResponse } from "./types.write";
import { useLanguage } from "@/pages/context/language-context";
export default function GrammarCheck(props: Props): JSX.Element {
  const { writeData, setWriteData } = props;
  const { language } = useLanguage();
  const prompt = `Correct this to standard ${language}:\n\n${writeData.textToCorrect}`;
  //call api with text to be translated;
  const handleCheckGrammar = async () => {
    try {
      /*      useFetchOpenAi({ prompt, language }).then((response) => {
        const grammarCorrection = response.content;
        setWriteData((prevData) => ({
          ...prevData,
          grammarCorrection,
          grammarCheck: true,
        }));
      }); */
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
