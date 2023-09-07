import React from "react";
import NewDeckForm from "./NewDeckForm";
import Decks from "./Decks";

export default function DecksContainer(): JSX.Element {
  return (
    <>
      <div className="decks">
        <NewDeckForm />
        <Decks />
      </div>
    </>
  );
}
