import React from "react";
import { useAudio } from "@/context/audio-context";
import { useTranslation } from "@/context/translation-context";
export default function Translation(): JSX.Element {
  const { audioUrl } = useAudio();
  const { translation } = useTranslation();
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
