import React, { useState } from "react";
import useFetchOpenAi from "@/hooks/useFetchOpenAi";
import { useLanguage } from "@/context/language-context";
import PrimaryButton from "../componentLibrary/buttons/PrimaryButton";
export default function WritingPrompt(): JSX.Element {
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const { language } = useLanguage();
  //Prompt topics
  const topics = [
    "the enviorment",
    "people",
    "life",
    "society",
    "daily life",
    "life reflections",
    "friend reflections",
    "gratefulness",
    "love",
    "friendship",
    "resilience",
    "confidence",
    "aspirations",
    "dreams",
    "goals",
  ];
  //prompt to send to api
  const prompt = `Give me a unique prompt about ${
    topics[Math.floor(Math.random() * topics.length)]
  }  in ${language} to help spark writing ideas :\n`;
  const writingPrompt = useFetchOpenAi({ prompt, language }).content;
  //openAI get writing prompt
  const handleGetPrompt = () => {
    setShowPrompt(!showPrompt);
  };
  return (
    <div className="promptContainer">
      <PrimaryButton onClick={handleGetPrompt} text="Generate Prompt" />
      {showPrompt ? <p className="writingPrompt">{writingPrompt}</p> : null}
    </div>
  );
}
