import React from "react";
import { SelectLangProps as Props } from "./types.translate";
export default function SelectLang(props: Props): JSX.Element {
  const {
    targetLanguage,
    setTargetLanguage,
    setTranslationData,
    setGrammarLang,
  } = props;
  //set target lang
  const handleSelectLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetLanguage(event.target.value);
    switch (event.target.value) {
      case "EN-US":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "en-US-SaraNeural",
        }));
        setGrammarLang("English-US");
        break;
      case "EN-GB":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "en-GB-RyanNeural",
        }));
        setGrammarLang("English-GB");
        break;
      case "ES":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "es-US-PalomaNeural",
        }));
        setGrammarLang("Spanish");
        break;
      case "FR":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "fr-BE-GerardNeural",
        }));
        setGrammarLang("French");
        break;
      case "DE":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "de-DE-ConradNeural",
        }));
        setGrammarLang("German");
        break;
      case "ZH":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "zh-CN-XiaoxuanNeural",
        }));
        setGrammarLang("Chinese");
        break;
      case "JA":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "ja-JP-NanamiNeural",
        }));
        setGrammarLang("Japanese");
        break;
      case "KO":
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "ko-KR-InJoonNeural",
        }));
        setGrammarLang("Korean");
        break;
      default:
        setTranslationData((prevData) => ({
          ...prevData,
          voice: "en-US-SaraNeural",
        }));
        setGrammarLang("English");
    }
  };
  return (
    <div className="selectWrapper">
      <h2>TRANSLATE TO : </h2>
      <select
        className="targetLang"
        value={targetLanguage}
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
  );
}
