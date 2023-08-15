import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
interface Props {
  prompt: string;
}
interface UseFetchOpenAiResponse {
  apiData?: OpenAiApiResponse;
}
interface OpenAiApiResponse {
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
export default function useFetchOpenAi(props: Props): UseFetchOpenAiResponse {
  const { prompt } = props;
  const [apiData, setApiData] = useState<OpenAiApiResponse>();
  //openAI
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const handleFetchApi = async () => {
    const response = (await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })) as OpenAiApiResponse;
    return response;
  };
  const fetchData = async () => {
    try {
      const response = await handleFetchApi();
      setApiData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [prompt]);
  return { apiData };
}
