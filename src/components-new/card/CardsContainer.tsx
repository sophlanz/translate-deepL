import React from "react";
import NewCardForm from "./NewCardForm";
import Cards from "./Cards";
export default function CardsContainer(): JSX.Element {
  return (
    <div className="cards">
      <NewCardForm />
      <div className="card">
        <h2>Word</h2>
        <h2>Translation</h2>
        <h2>Controls</h2>
      </div>
      <Cards />
    </div>
  );
}
