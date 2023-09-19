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
  const grammarPrompt = `Correct this to standard ${language}:\n\n${textToCorrect}`;
  const correctedGrammar = useFetchOpenAi({ grammarPrompt, language }).content;
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
