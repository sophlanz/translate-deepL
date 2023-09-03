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
