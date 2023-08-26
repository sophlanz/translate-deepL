import React from "react";
import Translate from "./Translate";
import Translation from "./Translation";
import { TranslateWrapperProps as Props } from "./types.translate";
import { AudioProvider } from "@/context/audio-context";
import { TranslationProvider } from "@/context/translation-context";
export default function TranslateWrapper(props: Props): JSX.Element {
  return (
    <TranslationProvider initialTranslation="">
      <AudioProvider initialUrl="">
        <div
          className="translateWrapper"
          /*   style={{ marginTop: translationData.loggedIn ? "-200px" : "75px" }} */
        >
          <Translate />
          <Translation />
        </div>
      </AudioProvider>
    </TranslationProvider>
  );
}