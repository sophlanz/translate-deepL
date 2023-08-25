export interface Props {
    wordOfTheDayData: WordOfTheDayData;
    getWordDefinition: () => void;
  }
  export interface WordOfTheDayData {
    wordOfDay: string;
    wordOfDayDefinition: string;
    showDefinition: boolean;
  }