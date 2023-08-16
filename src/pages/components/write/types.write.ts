export interface WritingWrapperProps {
    writeData: WriteData;
    grammarLang: string;
    setWriteData: React.Dispatch<React.SetStateAction<WriteData>>;
  }
  export interface GrammarCheckProps {
    writeData: WriteData;
    setWriteData: React.Dispatch<React.SetStateAction<WriteData>>;
    grammarLang: string;
  }
  export interface WritingPromptProps {
    promptBoolean: boolean;
    grammarLang: string;
    setWriteData:React.Dispatch<React.SetStateAction<WriteData>>;
    writeData:WriteData;
  }
  interface WriteData {
    textToCorrect: string;
    grammarCorrection: string;
    writingPrompt: string;
    prompt: boolean;
    grammarCheck: boolean;
  }
  export interface UseFetchOpenAiResponse {
    apiData?: OpenAiApiResponse;
  }
  export interface OpenAiApiResponse {
    data: {
      id: string;
      object: string;
      created: number;
      model: string;
      choices: TextChoice[];
      usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
      };
    };
  }
  interface TextChoice {
    text: string;
    index: number;
    logprobs: null;
    finish_reason: string;
  }