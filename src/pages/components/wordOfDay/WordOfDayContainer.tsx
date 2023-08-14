import React from "react";
import Image from "next/image";
interface Props {
  wordOfDay: string;
  wordOfDayDefinition: string;
  showDefinition: boolean;
  getWordDefinition: () => void;
}
export default function WordOfDayContainer(props: Props): JSX.Element {
  const { wordOfDay, wordOfDayDefinition, showDefinition, getWordDefinition } =
    props;
  return (
    <section className="wordOfDay">
      <h1>Word Of The Day</h1>
      <div>
        <h2>{wordOfDay}</h2>
        <figure>
          <Image
            onClick={getWordDefinition}
            alt="search"
            src="/images/search.png"
            height="20"
            width="20"
          ></Image>
        </figure>
      </div>
      {showDefinition ? <p>{wordOfDayDefinition}</p> : null}
    </section>
  );
}
