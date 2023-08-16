import React from "react";
import GrammarCheck from "./GrammarCheck";
import WritingPrompt from "./WritingPrompt";
import { WritingWrapperProps as Props } from "./types.write";
export default function WritingWrapper(props: Props): JSX.Element {
  const { writeData, setWriteData, grammarLang } = props;

  return (
    <div className="writingWrapper">
      <WritingPrompt
        promptBoolean={writeData.prompt}
        grammarLang={grammarLang}
        writeData={writeData}
        setWriteData={setWriteData}
      />
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
