import React, { useState } from "react";
import { useCards } from "../../context/card-context";
import type { Card } from "@prisma/client";
import ErrorMessage from "../errors/ErrorMessage";
interface Props {
  card: Card;
}
enum Status {
  Idle,
  Loading,
  Error,
}
export default function EditCardForm({ card }: Props): JSX.Element {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { edit, updateCards, cards, updateEditCard } = useCards();
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [error, setError] = useState<Error | undefined>();
  const handleUpdateCard = async (
    e: React.SyntheticEvent,
    cardId: string,
    cardFront: string,
    cardBack: string
  ) => {
    e.preventDefault();
    setStatus(Status.Loading);
    let body = {
      //if empty, keep old value
      front: front === "" ? cardFront : front,
      back: back === "" ? cardBack : back,
      cardId: cardId,
    };
    //send data to /api/card/update api route
    fetch("/api/card/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(() => {
        //update context
        const newCard = {
          id: card.id,
          deckId: card.deckId,
          front: body.front,
          back: body.back,
        };
        let newCards = cards.filter((card) => card.id !== cardId);
        newCards.push(newCard);
        updateCards(newCards);
        setStatus(Status.Idle);
      })
      .catch((error: Error) => {
        console.log(error);
        setError(error);
        setStatus(Status.Error);
      })
      .finally(() => {
        updateEditCard(false, "");
      });
  };
  if (status === Status.Error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <>
      {edit.cardId === card.id ? (
        <form
          key={card.id}
          onSubmit={(e) => handleUpdateCard(e, card.id, card.front, card.back)}
        >
          <label htmlFor="front">
            Front
            <input
              name="front"
              type="text"
              onChange={(e) => setFront(e.target.value)}
            />
          </label>
          <label htmlFor="back">
            Back
            <input
              name="back"
              type="text"
              onChange={(e) => setBack(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : null}
    </>
  );
}
