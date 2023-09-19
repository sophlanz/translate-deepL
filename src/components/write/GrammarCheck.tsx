import React, { useState } from "react";
import { useLanguage } from "@/context/language-context";
import useFetchOpenAi from "@/hooks/useFetchOpenAi";
import { PrimaryButton } from "../componentLibrary";
interface Props {
  textToCorrect: string;
}
export default function GrammarCheck({ textToCorrect }: Props): JSX.Element {
  const { language } = useLanguage();
  const [checkGrammar, setCheckGrammar] = useState<boolean>(false);
  const [correctedGrammar, setCorrectedGrammar] = useState<string>("");
  const grammarPrompt = `Correct this to standard ${language}:\n\n${textToCorrect}`;
  //change only when we click check grammar
  useFetchOpenAi({
    grammarPrompt,
    language,
  }).then((response) => {
    console.log(response.data);
    setCorrectedGrammar(response.data);
  });
  //openAI get writing prompt
  //call api with text to be translated;
  const handleCheckGrammar = () => {
    setCheckGrammar(!checkGrammar);
  };
  return (
    <div className="correctedGrammarContainer">
      <PrimaryButton
        onClick={handleCheckGrammar}
        text={"Check Grammar"}
        type={"button"}
      />
      {checkGrammar ? (
        <p className="correctedGrammar">{correctedGrammar}</p>
      ) : null}
    </div>
  );
}
