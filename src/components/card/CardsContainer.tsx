import React from "react";
import NewCardForm from "./NewCardForm";
import Cards from "./Cards";
export default function CardsContainer(): JSX.Element {
  return (
    <div className="cards">
      <NewCardForm />
      <div className="card">
        <h2 className="cardWordLabel">Word</h2>
        <h2 className="cardTranslationLabel">Translation</h2>
        <h2 className="cardControlsLabel">Controls</h2>
      </div>
      <Cards />
    </div>
  );
}
