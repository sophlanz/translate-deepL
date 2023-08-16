import React from "react";
import { TranslationProps as Props } from "./types.translate";
export default function Translation(props: Props): JSX.Element {
  const { translation, audioUrl } = props;
  return (
    <section className="translate">
      <h2 className="translation">TRANSLATION </h2>
      <p>{translation}</p>
      <div className="translationAudio">
        <audio controls src={audioUrl}>
          {" "}
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    </section>
  );
}
