import React from "react";
import SelectLang from "./SelectLang";
interface Props {
  translationData: TranslationData;
  setTranslationData: React.Dispatch<React.SetStateAction<TranslationData>>;
  handleSelectLang: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
}
interface TranslationData {
  toTranslate: string;
  translation: string;
  targetLanguage: string;
  grammarLang: string;
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
  } = props;
  return (
    <section className="translate">
      <SelectLang
        handleSelectLang={handleSelectLang}
        targetLanguage={translationData.targetLanguage}
      />
      <label htmlFor="textToTranslate">
        <textarea
          placeholder="The language will be detected, please start typing."
          id="textToTranslate"
          name="textToTranslate"
          value={translationData.toTranslate}
          onChange={(e) =>
            setTranslationData((prevData) => ({
              ...prevData,
              toTranslate: e.target.value,
            }))
          }
        />
      </label>
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </section>
  );
}
