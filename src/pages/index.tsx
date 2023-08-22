import React, { useState } from "react";
import Header from "./components/Header";
import { WordOfDayContainer } from "./components/wordOfDay";
import { TranslateWrapper } from "./components/translate";
import { WritingWrapper } from "./components/write";
import { TranslationData } from "./components/translate/types.translate";
import { WriteData } from "./components/write/types.write";

const initialTranslation: TranslationData = {
  toTranslate: "",
  translation: "",
  audioUrl: "english",
  voice: "en-US-SaraNeural",
  loggedIn: false,
};

const initialWriteData: WriteData = {
  textToCorrect: "",
  grammarCorrection: "",
  grammarCheck: false,
  writingPrompt: "",
  prompt: false,
};
export default function Home() {
  const [translationData, setTranslationData] =
    useState<TranslationData>(initialTranslation);
  const [writeData, setWriteData] = useState<WriteData>(initialWriteData);

  /*   const [loggedIn, setLoggedIn] = useState<boolean>(false); */

  return (
    <div className="homepage">
      <Header />
      <WordOfDayContainer />
      <TranslateWrapper
        translationData={translationData}
        setTranslationData={setTranslationData}
      />
      <WritingWrapper writeData={writeData} setWriteData={setWriteData} />
    </div>
  );
}
