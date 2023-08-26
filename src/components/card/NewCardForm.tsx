import React, { use, useState } from "react";
import { useCards } from "@/context/card-context";
export default function NewCardForm(): JSX.Element {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { cards, updateCards } = useCards();
  const resetInputValues = () => {
    setFront("");
    setBack("");
  };
  const handleCreateCard = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //send data to /api/create-deck api route
    //find deckId
    const url = window.location.href;
    const currDeckId = url.split("/deck/")[1];
    console.log("currDeckId", currDeckId);
    let body = {
      front: front,
      back: back,
      deckId: currDeckId,
    };

    await fetch("/api/card/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        const data = await response.json();
        //update context with new cards
        const newCard = {
          front: front,
          back: back,
          deckId: currDeckId,
          id: data.id,
        };
        let updatedCards = [...cards, newCard];
        updateCards(updatedCards);
        resetInputValues();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={(e) => handleCreateCard(e)}>
      <label htmlFor="front">
        Word
        <input
          name="front"
          type="text"
          onChange={(e) => setFront(e.target.value)}
          value={front}
        />
      </label>
      <label htmlFor="back">
        Translation
        <input
          name="back"
          type="text"
          onChange={(e) => setBack(e.target.value)}
          value={back}
        />
      </label>
      <button type="submit">New Card</button>
    </form>
  );
}
