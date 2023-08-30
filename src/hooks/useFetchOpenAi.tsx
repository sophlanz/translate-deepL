import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import type { UseFetchOpenAiResponse } from "../components/write/types.write";

let url: string = "https://ai-lengua.vercel.app/api/openai";
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:3000/api/openai";
}
interface Props {
  prompt?: string;
  language: string;
  grammarPrompt?: string;
  wordOfDay?: string;
}
export default function useFetchOpenAi(props: Props): UseFetchOpenAiResponse {
  const { prompt, language, grammarPrompt, wordOfDay } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const fetchData = async () => {
    setIsLoading(true);
    axios
      .request({
        url,
        params: {
          prompt: prompt ? prompt : grammarPrompt,
        },
      })
      .then((response) => {
        let data = response.data.choices[0].message.content;
        setContent(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [language, grammarPrompt, wordOfDay]);
  const memoizedData = useMemo(() => {
    return {
      content,
      isLoading,
    };
  }, [content, isLoading]);

  return memoizedData;
}
