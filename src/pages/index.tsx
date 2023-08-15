import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import prisma from "../../prisma/lib/prisma";
import Header from "./components/Header";
import Image from "next/image";
import { WordOfDayContainer } from "./components/wordOfDay";
import { TranslateWrapper } from "./components/translate";
interface TranslationData {
  toTranslate: string;
  translation: string;
  targetLanguage: string;
  grammarLang: string;
  audioUrl: string;
  voice: string;
  loggedIn: boolean;
}
const initialTranslation: TranslationData = {
  toTranslate: "",
  translation: "",
  targetLanguage: "EN-US",
  grammarLang: "English-US",
  audioUrl: "english",
  voice: "en-US-SaraNeural",
  loggedIn: false,
};
interface WordOfTheDay {
  wordOfDay: string;
  wordOfDayDefinition: string;
  showDefinition: boolean;
}
interface Write {
  textToCorrect: string;
  grammarCorrection: string;
  grammarLang: string;
  writingPrompt: string;
  prompt: boolean;
}
export default function Home() {
  const [translationData, setTranslationData] =
    useState<TranslationData>(initialTranslation);
  const [targetLanguage, setTargetLanguage] = useState<string>("EN-US");
  const [audioUrl, setAudioUrl] = useState<string>("english");
  const [textToCorrect, setTextToCorrect] = useState<string>("");
  const [grammarCorrection, setGrammarCorrection] = useState<any>();
  const [grammarLang, setGrammarLang] = useState<string>("English-US");
  const [voice, setVoice] = useState<string>("en-US-SaraNeural");
  const [writingPrompt, setWritingPrompt] = useState<any>();
  const [wordOfDay, setWordOfDay] = useState<any>();
  const [wordOfDayDefinition, setWordOfDayDefinition] = useState<any>();
  const [showDefinition, setShowDefinition] = useState<boolean>(false);
  const [grammarCheck, setGrammarCheck] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  //openAI
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  //call api with text to be translated;
  const handleCheckGrammar = async () => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Correct this to standard ${grammarLang}:\n\n${textToCorrect}`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text);

    setGrammarCorrection(response.data.choices[0].text);
    setGrammarCheck(true);
  };

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
  //openAI get writing prompt
  const handleGetPrompt = async () => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Give me a unique prompt about ${
        topics[Math.floor(Math.random() * topics.length)]
      }  in ${grammarLang} to help spark writing ideas :\n`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    setWritingPrompt(response.data.choices[0].text);
    setPrompt(true);
  };
  const wordTopics = [
    "literary",
    "coloquial",
    "formal",
    "informal",
    "fun",
    "intense",
    "light",
  ];

  const getWordDefinition = async () => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Tell me in  ${grammarLang} the definition of $ ${wordOfDay} , and use it in a sentence:\n`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    setWordOfDayDefinition(response.data.choices[0].text);
    setShowDefinition(!showDefinition);
  };
  useEffect(() => {
    //get random word in target laguage
    const getWordOfDay = async () => {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Give me a unique random advanced ${
          wordTopics[Math.floor(Math.random() * wordTopics.length)]
        } word in ${grammarLang} :\n`,
        temperature: 0,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      setWordOfDay(response.data.choices[0].text);
    };
    getWordOfDay();
  }, [targetLanguage]);
  return (
    <div className="homepage">
      <Header sendToParent={setLoggedIn} />
      <WordOfDayContainer
        wordOfDay={wordOfDay}
        getWordDefinition={getWordDefinition}
        wordOfDayDefinition={wordOfDayDefinition}
        showDefinition={showDefinition}
      />
      <TranslateWrapper
        translationData={translationData}
        setTranslationData={setTranslationData}
      />
      <div className="writingWrapper">
        <div className="prompt">
          <button onClick={handleGetPrompt}>Generate Prompt</button>
          {prompt ? <p>{writingPrompt}</p> : null}
        </div>
        <div className="textWrapper">
          <textarea
            placeholder="Generate a prompt, write some text, and check your grammar! "
            onChange={(e) => setTextToCorrect(e.target.value)}
          />
        </div>
        <div className="grammarCheck">
          <button onClick={handleCheckGrammar}>Check Grammar</button>
          {grammarCheck ? <p>{grammarCorrection}</p> : null}
        </div>
      </div>
    </div>
  );
}
