import React, { useState, useEffect } from "react";
import useFetchOpenAi from "@/hooks/useFetchOpenAi";
import WordOfDayDefinition from "./WordOfDayDefinition";
import { useLanguage } from "@/context/language-context";
export default function WordOfDay(): JSX.Element {
  const [wordOfTheDay, setWordOfTheDay] = useState<string>("");
  const { language } = useLanguage();
  const wordTopics = [
    "literary",
    "coloquial",
    "formal",
    "informal",
    "fun",
    "intense",
    "light",
  ];
  // Define an async function to fetch the word

  useFetchOpenAi({
    prompt: `Give me a unique random advanced word in ${language} from ${
      wordTopics[Math.floor(Math.random() * wordTopics.length)]
    } please don't give me the definition\n`,
    language,
  }).then((response) => {
    console.log(response.data);
    setWordOfTheDay(response.data);
  });

  return (
    <section className="wordOfDayContainer">
      <h1>Word Of The Day</h1>
      <div className="wordOfDayDefinition">
        <h2>{wordOfTheDay}</h2>
        <WordOfDayDefinition wordOfDay={wordOfTheDay} />
      </div>
    </section>
  );
}
