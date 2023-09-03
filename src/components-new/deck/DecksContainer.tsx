import React from "react";
import Quote from "./Quote";
import NewDeckForm from "./NewDeckForm";
import Decks from "./Decks";

export default function DecksContainer(): JSX.Element {
  return (
    <>
      <Quote />
      <div className="decks">
        <NewDeckForm />
        <Decks />
      </div>
    </>
  );
}
