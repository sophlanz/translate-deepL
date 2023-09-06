import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetchOpenAi from "@/hooks/useFetchOpenAi";
import { useLanguage } from "@/context/language-context";
interface Props {
  wordOfDay: string;
}
export default function WordOfDayDefinition({ wordOfDay }: Props): JSX.Element {
  const { language } = useLanguage();
  const [showDefinition, setShowDefinition] = useState<boolean>(false);
  /*   const [wordDefinition, setWordDefinition] = useState<string>(""); */
  const prompt = `what is the definition of ${wordOfDay}?`;
  const wordDefinition = useFetchOpenAi({ prompt, language, wordOfDay });
  const showWordDefinition = async () => {
    setShowDefinition(!showDefinition);
  };
  return (
    <>
      <figure className="searchDefinition">
        <Image
          onClick={showWordDefinition}
          alt="search"
          title="search"
          src="/icons/search.png"
          height="30"
          width="30"
        ></Image>
      </figure>
      {showDefinition ? (
        <p onClick={showWordDefinition}>{wordDefinition.content}</p>
      ) : null}
    </>
  );
}
