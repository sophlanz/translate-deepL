import React from "react";
import { useAudio } from "@/context/audio-context";
import { useTranslation } from "@/context/translation-context";
import AudioPlayer from "../audioPlayer/AudioPlayer";
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
    <section className="translation">
      <p className="translationDisplay">{translation}</p>
      <div className="translationAudio">
        <AudioPlayer />
        {audioGenerationStatus === Status.Loading ? (
          <div className="generateAudio">
            <Image
              className="loadingIcon"
              src="/icons/loading.png"
              alt="loading"
              height={30}
              width={30}
            />
            <h6>Generating Audio</h6>
          </div>
        ) : null}
      </div>
    </section>
  );
}
