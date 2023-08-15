import React from "react";
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
    <div className="translate">
      <div className="selectWrapper">
        <h2>TRANSLATE TO : </h2>
        <select
          className="targetLang"
          value={translationData.targetLanguage}
          onChange={handleSelectLang}
        >
          <option value="EN-US">English-US</option>
          <option value="EN-GB">English-GB</option>
          <option value="ES">Spanish</option>
          <option value="FR">French</option>
          <option value="DE">German</option>
          <option value="ZH">Chinese</option>
          <option value="JA">Japanese</option>
          <option value="KO">Korean</option>
        </select>
      </div>
      <label htmlFor="textToTranslate">
        <textarea
          placeholder="The language will be detected, please start typing."
          onChange={(e) =>
            setTranslationData((prevData) => ({
              ...prevData,
              toTranslate: e.target.value,
            }))
          }
        />
      </label>
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </div>
  );
}
