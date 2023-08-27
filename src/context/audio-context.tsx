import React, { useContext, createContext, useState } from "react";
enum Status {
  Idle,
  Loading,
  Error,
}
type AudioContextType = {
  audioUrl: string;
  audioGenerationStatus: Status;
  updateAudioGenerationStatus: (newStatus: Status) => void;
  changeAudioUrl: (newUrl: string) => void;
};
const AudioContext = createContext<AudioContextType | undefined>(undefined);
type AudioProviderProps = {
  children: JSX.Element | JSX.Element[];
  initialUrl: string;
};
export const AudioProvider = ({ children, initialUrl }: AudioProviderProps) => {
  const [audioUrl, setAudioUrl] = useState<string>(initialUrl);
  const [audioGenerationStatus, setAudioGenerationStatus] = useState<Status>(
    Status.Idle
  );
  const changeAudioUrl = (newUrl: string) => {
    setAudioUrl(newUrl);
  };
  const updateAudioGenerationStatus = (newStatus: Status) => {
    setAudioGenerationStatus(newStatus);
  };
  return (
    <AudioContext.Provider
      value={{
        audioUrl,
        changeAudioUrl,
        audioGenerationStatus,
        updateAudioGenerationStatus,
      }}
    >
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
