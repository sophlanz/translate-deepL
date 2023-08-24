import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { WordOfDayContainer } from "./components/wordOfDay";
import { TranslateWrapper } from "./components/translate";
import { WritingWrapper } from "./components/write";
import { TranslationData } from "./components/translate/types.translate";

const initialTranslation: TranslationData = {
  toTranslate: "",
  translation: "",
  audioUrl: "english",
  voice: "en-US-SaraNeural",
  loggedIn: false,
};

export default function Home() {
  const [translationData, setTranslationData] =
    useState<TranslationData>(initialTranslation);

  /*   const [loggedIn, setLoggedIn] = useState<boolean>(false); */

  return (
    <div className="homepage">
      <Header />
      <WordOfDayContainer />
      <TranslateWrapper
        translationData={translationData}
        setTranslationData={setTranslationData}
      />
      <WritingWrapper />
    </div>
  );
}
