import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetchOpenAi from "@/hooks/useFetchOpenAi";
import { useLanguage } from "@/context/language-context";
interface Props {
  wordOfDay: string;
}
export default function WordOfDayDefinition(props: Props): JSX.Element {
  const { wordOfDay } = props;
  const { language } = useLanguage();
  const [showDefinition, setShowDefinition] = useState<boolean>(false);
  /*   const [wordDefinition, setWordDefinition] = useState<string>(""); */
  let prompt = `what is the definition of ${wordOfDay}?`;
  const wordDefinition = useFetchOpenAi({ prompt, language, wordOfDay });
  console.log(wordOfDay);
  console.log(wordDefinition);
  const showWordDefinition = async () => {
    setShowDefinition(!showDefinition);
  };
  return (
    <>
      <figure>
        <Image
          onClick={showWordDefinition}
          alt="search"
          src="/images/search.png"
          height="20"
          width="20"
        ></Image>
      </figure>
      {showDefinition ? (
        <p onClick={showWordDefinition}>{wordDefinition.content}</p>
      ) : null}
    </>
  );
}
