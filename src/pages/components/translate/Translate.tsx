import React from "react";
import SelectLang from "./SelectLang";
import TranslateLabel from "./TranslateLabel";
interface Props {
  translationData: TranslationData;
  targetLanguage: string;
  setTranslationData: React.Dispatch<React.SetStateAction<TranslationData>>;
  handleSelectLang: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
}
interface TranslationData {
  toTranslate: string;
  translation: string;
  audioUrl: string;
  voice: string;
  loggedIn: boolean;
}
export default function Translate(props: Props): JSX.Element {
  const {
    translationData,
    setTranslationData,
    handleSelectLang,
    handleSubmit,
    targetLanguage,
  } = props;
  return (
    <section className="translate">
      <SelectLang
        handleSelectLang={handleSelectLang}
        targetLanguage={targetLanguage}
      />
      <TranslateLabel
        handleSubmit={handleSubmit}
        translationData={translationData}
        setTranslationData={setTranslationData}
      />
    </section>
  );
}
