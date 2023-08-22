import React, { useState, useEffect } from "react";
import { UseFetchOpenAiResponse } from "@/pages/components/write/types.write";

/* export default function useFetchOpenAi2(
  prompt: string
): Promise<UseFetchOpenAiResponse> {
  const [content, setContent] = useState<boolean>(false);
  return Promise.resolve({
    content: prompt,
    isLoading: false,
  });
} */
interface Props {
  prompt: string;
  language: string;
}
export default function useFetchOpenAi2(props: Props): UseFetchOpenAiResponse {
  const [content, setContent] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);
  const { prompt, language } = props;
  const updateData = () => {
    setContent("hello");
    setIsLoading(false);
  };
  useEffect(() => {
    updateData();
    console.log("hi");
  }, [language]);
  return {
    content,
    isLoading: false,
  };
}
