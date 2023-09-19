import React from "react";
import Translate from "./Translate";
import Translation from "./Translation";
import SelectLang from "./SelectLang";
import TranslateLabel from "./TranslateLabel";
import { AudioProvider } from "@/context/audio-context";
import { TranslationProvider } from "@/context/translation-context";
export default function TranslateWrapper(): JSX.Element {
  return (
    <TranslationProvider initialTranslation="Translation">
      <AudioProvider initialUrl="">
        <div
          className="translateWrapper"
          /*   style={{ marginTop: translationData.loggedIn ? "-200px" : "75px" }} */
        >
          <section className="translate">
            <SelectLang />
            <TranslateLabel />
          </section>
          <Translation />
        </div>
      </AudioProvider>
    </TranslationProvider>
  );
}
