import React, { use, useState } from "react";
import { useCards } from "../../context/card-context";
import type { Card } from "@prisma/client";
export default function EditCardForm(props: { card: Card }): JSX.Element {
  const { card } = props;
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { edit, updateCards, cards, updateEditCard } = useCards();
  const handleUpdateCard = async (
    e: React.SyntheticEvent,
    cardId: string,
    cardFront: string,
    cardBack: string
  ) => {
    e.preventDefault();
    let body = {
      //if empty, keep old value
      front: front === "" ? cardFront : front,
      back: back === "" ? cardBack : back,
      cardId: cardId,
    };
    //send data to /api/card/update api route
    await fetch("/api/card/update", {
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
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Network response failed.");
      })
      .finally(() => {
        updateEditCard(false, "");
      });
  };
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
