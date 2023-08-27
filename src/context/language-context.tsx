import React, { useContext, createContext, useState } from "react";
//grammarLang context
type LanguageContextType = {
  language: string;
  changeLanguage: (newLanguage: string) => void;
  voice: string;
  changeVoice: (newVoice: string) => void;
};
export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

type LanguageProviderProps = {
  children: JSX.Element | JSX.Element[];
  initialLanguage: string;
};

export const LanguageProvider = ({
  children,
  initialLanguage,
}: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>(initialLanguage);
  const [voice, setVoice] = useState<string>("larry");
  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };
  const changeVoice = (newVoice: string) => {
    setVoice(newVoice);
  };
  return (
    <LanguageContext.Provider
      value={{ language, voice, changeLanguage, changeVoice }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
export const useLanguage = () => {
  const languageContext = useContext(LanguageContext);
  if (languageContext === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return languageContext;
};
