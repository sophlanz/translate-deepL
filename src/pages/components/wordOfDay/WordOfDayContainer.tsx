import React from "react";
import Image from "next/image";
import { Props } from "./types.wordOfDay";

export default function WordOfDayContainer(props: Props): JSX.Element {
  const { wordOfTheDayData, getWordDefinition } = props;
  props;
  return (
    <section className="wordOfDay">
      <h1>Word Of The Day</h1>
      <div>
        <h2>{wordOfTheDayData.wordOfDay}</h2>
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
      {wordOfTheDayData.showDefinition ? (
        <p>{wordOfTheDayData.wordOfDayDefinition}</p>
      ) : null}
    </section>
  );
}
