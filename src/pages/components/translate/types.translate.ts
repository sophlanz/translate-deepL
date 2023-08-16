export interface TranslateWrapperProps {
    translationData: TranslationData;
    setTranslationData: React.Dispatch<React.SetStateAction<TranslationData>>;
    targetLanguage: string;
    setGrammarLang: React.Dispatch<React.SetStateAction<string>>;
    setTargetLanguage: React.Dispatch<React.SetStateAction<string>>;
  }
  export interface TranslateProps {
    translationData: TranslationData;
    targetLanguage: string;
    setTranslationData: React.Dispatch<React.SetStateAction<TranslationData>>;
    setTargetLanguage: React.Dispatch<React.SetStateAction<string>>;
    setGrammarLang: React.Dispatch<React.SetStateAction<string>>;
  }
  export interface TranslationProps {
    translation: string;
    audioUrl: string;
  }
  export interface SelectLangProps {
    targetLanguage: string;
    setTargetLanguage: React.Dispatch<React.SetStateAction<string>>;
    setGrammarLang: React.Dispatch<React.SetStateAction<string>>;
    setTranslationData: React.Dispatch<React.SetStateAction<TranslationData>>;
  }
  export interface TranslateLabelProps {
    setTranslationData: React.Dispatch<React.SetStateAction<TranslationData>>;
    translationData: TranslationData;
    targetLanguage: string;
  }
  export interface TranslationData {
    toTranslate: string;
    translation: string;
    audioUrl: string;
    voice: string;
    loggedIn: boolean;
  }