export interface TranslateWrapperProps {
    translationData: TranslationData;
    setTranslationData: React.Dispatch<React.SetStateAction<TranslationData>>;
  }
  export interface TranslateProps {
    translationData: TranslationData;
    setTranslationData: React.Dispatch<React.SetStateAction<TranslationData>>;
  }
  export interface TranslationProps {
    translation: string;
    audioUrl: string;
  }

  export interface TranslationData {
    toTranslate: string;
    translation: string;
    audioUrl: string;
    voice: string;
    loggedIn: boolean;
  }