import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import Header from "./components/Header";
import { WordOfDayContainer } from "./components/wordOfDay";
import { TranslateWrapper } from "./components/translate";
import { WritingWrapper } from "./components/write";
interface TranslationData {
  toTranslate: string;
  translation: string;
  audioUrl: string;
  voice: string;
  loggedIn: boolean;
}
const initialTranslation: TranslationData = {
  toTranslate: "",
  translation: "",
  audioUrl: "english",
  voice: "en-US-SaraNeural",
  loggedIn: false,
};
interface WordOfTheDayData {
  wordOfDay: string;
  wordOfDayDefinition: string;
  showDefinition: boolean;
}
const initialWordOfTheDayData: WordOfTheDayData = {
  wordOfDay: "",
  wordOfDayDefinition: "",
  showDefinition: false,
};
interface WriteData {
  textToCorrect: string;
  grammarCorrection: string;
  writingPrompt: string;
  prompt: boolean;
  grammarCheck: boolean;
}
const initialWriteData: WriteData = {
  textToCorrect: "",
  grammarCorrection: "",
  grammarCheck: false,
  writingPrompt: "",
  prompt: false,
};
interface OpenAiApiResponse {
  data: {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: TextChoice[];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
}
interface TextChoice {
  text: string;
  index: number;
  logprobs: null;
  finish_reason: string;
}
export default function Home() {
  const [translationData, setTranslationData] =
    useState<TranslationData>(initialTranslation);
  const [wordOfTheDayData, setWordOfTheDayData] = useState<WordOfTheDayData>(
    initialWordOfTheDayData
  );
  const [writeData, setWriteData] = useState<WriteData>(initialWriteData);
  const [targetLanguage, setTargetLanguage] = useState<string>("EN-US");
  const [grammarLang, setGrammarLang] = useState<string>("English-US");
  const [wordOfDay, setWordOfDay] = useState<any>();
  const [showDefinition, setShowDefinition] = useState<boolean>(false);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  //openAI
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

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
    const response = (await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Tell me in  ${grammarLang} the definition of $ ${wordOfDay} , and use it in a sentence:\n`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })) as OpenAiApiResponse;
    setWordOfTheDayData((prevData) => ({
      ...prevData,
      wordOfDayDefinition: response.data.choices[0].text,
      showDefinition: !showDefinition,
    }));
  };
  useEffect(() => {
    //get random word in target laguage
    const getWordOfDay = async () => {
      const response = (await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Give me a unique random advanced ${
          wordTopics[Math.floor(Math.random() * wordTopics.length)]
        } word in ${grammarLang} :\n`,
        temperature: 0,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })) as OpenAiApiResponse;
      setWordOfTheDayData((prev) => ({
        ...prev,
        wordOfDay: response.data.choices[0].text,
      }));
    };
    getWordOfDay();
  }, [targetLanguage]);
  return (
    <div className="homepage">
      <Header sendToParent={setLoggedIn} />
      <WordOfDayContainer
        wordOfTheDayData={wordOfTheDayData}
        getWordDefinition={getWordDefinition}
      />
      <TranslateWrapper
        translationData={translationData}
        setTranslationData={setTranslationData}
        targetLanguage={targetLanguage}
        setTargetLanguage={setTargetLanguage}
        setGrammarLang={setGrammarLang}
      />
      <WritingWrapper
        writeData={writeData}
        grammarLang={grammarLang}
        setWriteData={setWriteData}
      />
    </div>
  );
}
