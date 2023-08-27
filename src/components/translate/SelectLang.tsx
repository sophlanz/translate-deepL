import React from "react";
import { useLanguage } from "@/context/language-context";
export default function SelectLang(): JSX.Element {
  const { language, changeLanguage, changeVoice } = useLanguage();
  //set target lang
  const handleSelectLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case "English-US":
        changeVoice("anny");
        changeLanguage("English-US");
        break;
      case "English-GB":
        changeVoice("arthur");
        changeLanguage("English-GB");
        break;
      case "Spanish":
        changeVoice("es-US-PalomaNeural");
        changeLanguage("Spanish");
        break;
      case "French":
        changeVoice("fr-BE-GerardNeural");
        changeLanguage("French");
        break;
      case "German":
        changeVoice("de-DE-ConradNeural");
        changeLanguage("German");
        break;
      case "Chinese":
        changeVoice("zh-CN-XiaoxuanNeural");
        changeLanguage("Chinese");
        break;
      case "Japanese":
        changeVoice("ja-JP-NanamiNeural");
        changeLanguage("Japanese");
        break;
      case "Korean":
        changeVoice("ko-KR-InJoonNeural");
        changeLanguage("Korean");
        break;
      default:
        changeVoice("larry");
        changeLanguage("English-US");
    }
  };
  console.log(language);
  return (
    <div className="selectWrapper">
      <h2>TRANSLATE TO : </h2>
      <select
        className="targetLang"
        value={language}
        onChange={(e) => handleSelectLang(e)}
      >
        <option value="English-US">English-US</option>
        <option value="English-GB">English-GB</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Chinese">Chinese</option>
        <option value="Japanese">Japanese</option>
        <option value="Korean">Korean</option>
      </select>
    </div>
  );
}
