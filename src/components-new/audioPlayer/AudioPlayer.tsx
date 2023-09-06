import React, { useState, useRef, useEffect } from "react";
import { useAudio } from "@/context/audio-context";
import Image from "next/image";
export default function AudioPlayer(): JSX.Element {
  const { audioUrl } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleAudioClick = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    const handleAudioEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };

    const handleAudioPlay = () => {
      setIsEnded(false);
    };

    audioElement?.addEventListener("ended", handleAudioEnded);
    audioElement?.addEventListener("play", handleAudioPlay);

    return () => {
      audioElement?.removeEventListener("ended", handleAudioEnded);
      audioElement?.removeEventListener("play", handleAudioPlay);
    };
  }, []);

  return (
    <div className="audioPlayer" onClick={handleAudioClick}>
      <Image
        src={
          isEnded
            ? "/icons/speaker.png"
            : isPlaying
            ? "/icons/pause.png"
            : "/icons/speaker.png"
        }
        alt="speaker"
        height={30}
        width={30}
      />
      <audio ref={audioRef} controls src={audioUrl}></audio>
    </div>
  );
}
