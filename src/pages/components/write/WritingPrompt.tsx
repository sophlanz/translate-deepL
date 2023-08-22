import React, { useState } from "react";
import useFetchOpenAi from "@/pages/hooks/useFetchOpenAi";
import { useLanguage } from "@/pages/context/language-context";
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
    <div className="prompt">
      <button onClick={handleGetPrompt}>Generate Prompt</button>
      {showPrompt ? <p>{writingPrompt}</p> : null}
    </div>
  );
}
