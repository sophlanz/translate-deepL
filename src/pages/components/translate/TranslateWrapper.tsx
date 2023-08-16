import React from "react";
import axios from "axios";
import Translate from "./Translate";
import Translation from "./Translation";
import { TranslateWrapperProps as Props } from "./types.translate";
export default function TranslateWrapper(props: Props): JSX.Element {
  const {
    translationData,
    setTranslationData,
    targetLanguage,
    setGrammarLang,
    setTargetLanguage,
  } = props;

  return (
    <div
      className="translateWrapper"
      style={{ marginTop: translationData.loggedIn ? "-200px" : "75px" }}
    >
      <Translate
        translationData={translationData}
        setTranslationData={setTranslationData}
        targetLanguage={targetLanguage}
        setTargetLanguage={setTargetLanguage}
        setGrammarLang={setGrammarLang}
      />
      <Translation
        translation={translationData.translation}
        audioUrl={translationData.audioUrl}
      />
    </div>
  );
}
