import React, { useState } from "react";
import { useDecks } from "@/pages/context/decks-context";
import router from "next/router";
export default function NewCardForm(): JSX.Element {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { currDeckId } = useDecks();
  const handleCreateCard = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //send data to /api/create-deck api route
    let body = {
      front: front,
      back: back,
      deckId: currDeckId,
    };
    try {
      await fetch("/api/card/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(() => {
        //refresh to get server side props
        router.replace(router.asPath);
      });
    } catch (error) {
      console.log(error);
    }
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
