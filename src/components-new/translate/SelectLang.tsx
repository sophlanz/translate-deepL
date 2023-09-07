import React from "react";
import { useLanguage } from "@/context/language-context";
import Image from "next/image";
import { Select, SelectOption } from "../componentLibrary";
const selectOptions = [
  "English-US",
  "English-GB",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Korean",
];
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

  return (
    <section className="selectLang">
      <h2>Detect Language</h2>
      <Image src="/icons/arrow.png" alt="arrow" width="30" height="30" />
      <Select value={language} onChange={handleSelectLang}>
        {selectOptions.map((option) => (
          <SelectOption value={option} key={option} classes={"targetLang"} />
        ))}
      </Select>
    </section>
  );
}
//Make separate select component. Pass in array of strings or break up into 2 components, select and select options.
