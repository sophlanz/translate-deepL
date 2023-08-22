import React from "react";
import Translate from "./Translate";
import Translation from "./Translation";
import { TranslateWrapperProps as Props } from "./types.translate";
import { AudioProvider } from "@/pages/context/audio-context";
export default function TranslateWrapper(props: Props): JSX.Element {
  return (
    <AudioProvider initialUrl="">
      <div
        className="translateWrapper"
        /*   style={{ marginTop: translationData.loggedIn ? "-200px" : "75px" }} */
      >
        <Translate />
        <Translation />
      </div>
    </AudioProvider>
  );
}
