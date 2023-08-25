import React, { useContext, createContext, useState } from "react";
type AudioContextType = {
  audioUrl: string;
  changeAudioUrl: (newUrl: string) => void;
};
const AudioContext = createContext<AudioContextType | undefined>(undefined);
type AudioProviderProps = {
  children: JSX.Element | JSX.Element[];
  initialUrl: string;
};
export const AudioProvider = ({ children, initialUrl }: AudioProviderProps) => {
  const [audioUrl, setAudioUrl] = useState<string>(initialUrl);
  const changeAudioUrl = (newUrl: string) => {
    setAudioUrl(newUrl);
  };
  return (
    <AudioContext.Provider value={{ audioUrl, changeAudioUrl }}>
      {children}
    </AudioContext.Provider>
  );
};
export const useAudio = () => {
  const audioContext = useContext(AudioContext);
  if (audioContext === undefined) {
    throw new Error("useAudio must be used within a AudioProvider");
  }
  return audioContext;
};
