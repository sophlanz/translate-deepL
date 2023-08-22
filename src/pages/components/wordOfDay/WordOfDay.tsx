import React, { useState, useEffect } from "react";
import useFetchOpenAi from "@/pages/hooks/useFetchOpenAi";
import useFetchOpenAi2 from "@/pages/hooks/useFetchOpenAi2";
import WordOfDayDefinition from "./WordOfDayDefinition";
import { useLanguage } from "@/pages/context/language-context";
export default function WordOfDay(): JSX.Element {
  const [wordOfTheDay, setWordOfTheDay] = useState<string>("");
  const { language, changeLanguage } = useLanguage();
  const wordTopics = [
    "literary",
    "coloquial",
    "formal",
    "informal",
    "fun",
    "intense",
    "light",
  ];
  /*   ${
    wordTopics[Math.floor(Math.random() * wordTopics.length)]
  } */
  const prompt = `Give me a unique random advanced word in ${language} from ${
    wordTopics[Math.floor(Math.random() * wordTopics.length)]
  } please don't give me the definition\n`;
  const word = useFetchOpenAi({ prompt, language }).content;
  console.log(word);
  useEffect(() => {
    setWordOfTheDay(word);
  }, [word]);
  return (
    <section>
      <h1>Word Of The Day</h1>
      <div>
        <h2>{wordOfTheDay}</h2>
        <WordOfDayDefinition wordOfDay={wordOfTheDay} />
      </div>
    </section>
  );
}