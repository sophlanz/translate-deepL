import React, { useState } from "react";
import { useLanguage } from "@/context/language-context";
import useFetchOpenAi from "@/hooks/useFetchOpenAi";
interface Props {
  textToCorrect: string;
}
export default function GrammarCheck(props: Props): JSX.Element {
  const { language } = useLanguage();
  const { textToCorrect } = props;
  const [checkGrammar, setCheckGrammar] = useState<boolean>(false);
  const grammarPrompt = `Correct this to standard ${language}:\n\n${textToCorrect}`;
  const correctedGrammar = useFetchOpenAi({ grammarPrompt, language }).content;
  //call api with text to be translated;
  const handleCheckGrammar = () => {
    setCheckGrammar(!checkGrammar);
  };
  console.log(textToCorrect);
  return (
    <div className="grammarCheck">
      <button onClick={handleCheckGrammar}>Check Grammar</button>
      {checkGrammar ? <p>{correctedGrammar}</p> : null}
    </div>
  );
}