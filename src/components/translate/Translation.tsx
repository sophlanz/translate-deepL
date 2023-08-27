import React from "react";
import { useAudio } from "@/context/audio-context";
import { useTranslation } from "@/context/translation-context";
import ErrorMessage from "../errors/ErrorMessage";
import Image from "next/image";
enum Status {
  Idle,
  Loading,
  Error,
}
export default function Translation(): JSX.Element {
  const { audioUrl, audioGenerationStatus } = useAudio();
  const { translation } = useTranslation();
  return (
    <section className="translate">
      <h2 className="translation">TRANSLATION </h2>
      <p>{translation}</p>
      <div className="translationAudio">
        {audioGenerationStatus === Status.Loading ? (
          <div className="generateAudio">
            <Image
              className="loadingIcon"
              src="/images/loading.png"
              alt="loading"
              height={30}
              width={30}
            />
            <h6>Generating Audio</h6>
          </div>
        ) : null}
        <audio controls src={audioUrl}>
          {" "}
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    </section>
  );
}
