import React from "react";
import SelectLang from "./SelectLang";
import TranslateLabel from "./TranslateLabel";
import axios from "axios";
import { TranslateProps as Props } from "./types.translate";

export default function Translate(props: Props): JSX.Element {
  const {
    translationData,
    setTranslationData,
    targetLanguage,
    setTargetLanguage,
    setGrammarLang,
  } = props;

  return (
    <section className="translate">
      <SelectLang
        targetLanguage={targetLanguage}
        setGrammarLang={setGrammarLang}
        setTargetLanguage={setTargetLanguage}
        setTranslationData={setTranslationData}
      />
      <TranslateLabel
        translationData={translationData}
        setTranslationData={setTranslationData}
        targetLanguage={targetLanguage}
      />
    </section>
  );
}
