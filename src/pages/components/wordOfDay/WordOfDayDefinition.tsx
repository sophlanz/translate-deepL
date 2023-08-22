import React, { useState } from "react";
import Image from "next/image";
import useFetchOpenAi from "@/pages/hooks/useFetchOpenAi";
import { useLanguage } from "@/pages/context/language-context";
interface Props {
  wordOfDay: string;
}
export default function WordOfDayDefinition(props: Props): JSX.Element {
  const { wordOfDay } = props;
  const { language } = useLanguage();
  const [showDefinition, setShowDefinition] = useState<boolean>(false);
  /*   const [wordDefinition, setWordDefinition] = useState<string>(""); */
  const prompt = `Tell me in  ${language} the definition of $ ${wordOfDay} , and use it in a sentence:\n`;
  const wordDefinition = useFetchOpenAi({ prompt, language });
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
