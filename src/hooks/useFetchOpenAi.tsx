import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import type { UseFetchOpenAiResponse } from "../components/write/types.write";

let url: string = "https://ai-lengua.vercel.app/api/openai";
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:3000/api/openai";
}
interface Props {
  prompt?: string;
  language?: string;
  grammarPrompt?: string;
  wordOfDay?: string;
}
export default function useFetchOpenAi(
  props: Props
): Promise<UseFetchOpenAiResponse> {
  return new Promise<UseFetchOpenAiResponse>((resolve, reject) => {
    const { prompt, language, grammarPrompt, wordOfDay } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");
    //fetch prompt or grammar prompt
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.request({
          url,
          params: {
            prompt: prompt ? prompt : grammarPrompt,
          },
        });
        let data = response.data.choices[0].message.content;
        console.log(data);
        setContent(data);
        setIsLoading(false);
        console.log(content);
        resolve({ data, isLoading });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        reject(error);
      }
    };
    useEffect(() => {
      fetchData();
    }, [language, grammarPrompt, wordOfDay]);
  });
}
