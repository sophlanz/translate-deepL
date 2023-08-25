export interface WritingWrapperProps {
    writeData: WriteData;
    setWriteData: React.Dispatch<React.SetStateAction<WriteData>>;
  }
  export interface GrammarCheckProps {
    writeData: WriteData;
    setWriteData: React.Dispatch<React.SetStateAction<WriteData>>;
  }
  export interface WritingPromptProps {
    promptBoolean: boolean;
    setWriteData:React.Dispatch<React.SetStateAction<WriteData>>;
    writeData:WriteData;
  }
  export interface WriteData {
    textToCorrect: string;
    grammarCorrection: string;
    writingPrompt: string;
    prompt: boolean;
    grammarCheck: boolean;
  }
  export interface UseFetchOpenAiResponse {
    content: string;
    isLoading: boolean;
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
    message:MessageObject;
    index: number;
    logprobs: null;
    finish_reason: string;
  }
  interface MessageObject {
    content:string,
    role:string
  }
