import React, { useState } from "react";
import { useCards } from "@/context/card-context";
import ErrorMessage from "../errors/ErrorMessage";
enum Status {
  Idle,
  Loading,
  Error,
}
export default function NewCardForm(): JSX.Element {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { cards, updateCards } = useCards();
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [error, setError] = useState<Error | undefined>();
  const resetInputValues = () => {
    setFront("");
    setBack("");
  };
  const handleCreateCard = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStatus(Status.Loading);
    //send data to /api/create-deck api route
    //find deckId
    const url = window.location.href;
    const currDeckId = url.split("/deck/")[1];
    let body = {
      front: front,
      back: back,
      deckId: currDeckId,
    };
    fetch("/api/card/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
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
        setStatus(Status.Idle);
      })
      .catch((error: Error) => {
        console.log(error);
        setStatus(Status.Error);
        setError(error);
      });
  };
  if (status === Status.Error) {
    return <ErrorMessage error={error} />;
  }
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
