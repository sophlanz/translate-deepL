import React, { useState } from "react";
import GrammarCheck from "./GrammarCheck";
import WritingPrompt from "./WritingPrompt";
export default function WritingWrapper(): JSX.Element {
  const [textToCorrect, setTextToCorrect] = useState<string>("");
  const handleSetTextToCorrect = (newText: string) => {
    setTextToCorrect(newText);
  };
  return (
    <div className="writingWrapper">
      <WritingPrompt />
      <div className="textWrapper">
        <textarea
          placeholder="Generate a prompt, write some text, and check your grammar! "
          onChange={(e) => handleSetTextToCorrect(e.target.value)}
        />
      </div>
      <GrammarCheck textToCorrect={textToCorrect} />
    </div>
  );
}
