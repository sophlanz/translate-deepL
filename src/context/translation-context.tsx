import React, { createContext, useContext, useState } from "react";

type TranslationContextType = {
  translation: string;
  changeTranslation: (newTranslation: string) => void;
};
const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

type TranslationProviderProps = {
  children: JSX.Element | JSX.Element[];
  initialTranslation: string;
};
export const TranslationProvider = ({
  children,
  initialTranslation,
}: TranslationProviderProps) => {
  const [translation, setTranslation] = useState<string>(initialTranslation);
  const changeTranslation = (newTranslation: string) => {
    setTranslation(newTranslation);
  };
  return (
    <TranslationContext.Provider value={{ translation, changeTranslation }}>
      {children}
    </TranslationContext.Provider>
  );
};
export const useTranslation = () => {
  const translationContext = useContext(TranslationContext);
  if (translationContext === undefined) {
    throw Error("useTranslation must be used within a TranslationProvider");
  }
  return translationContext;
};
