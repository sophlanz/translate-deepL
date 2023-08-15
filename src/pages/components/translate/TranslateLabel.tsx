import React from "react";
interface Props {
  setTranslationData: React.Dispatch<React.SetStateAction<TranslationData>>;
  translationData: TranslationData;
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
export default function TranslateLabel(props: Props): JSX.Element {
  const { translationData, setTranslationData, handleSubmit } = props;
  return (
    <>
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
    </>
  );
}
