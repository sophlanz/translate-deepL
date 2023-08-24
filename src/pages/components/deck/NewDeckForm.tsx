import React from "react";
import router from "next/router";
import { useDecks } from "@/pages/context/decks-context";
export default function NewDeckForm(): JSX.Element {
  const { deckTitle, changeDeckTitle, decks, updateDecks } = useDecks();
  console.log(deckTitle);
  const handleCreateDeck = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //send data to /api/create-deck api route
    fetch("/api/deck/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: deckTitle }),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          //update context with new deck
          const { name, id } = data;
          const newDeck = { name, id };
          const updatedDecks = [...decks, newDeck];
          updateDecks(updatedDecks);
        } else {
          console.log("request failed with status", response.status);
          throw new Error("Network response failed.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleCreateDeck}>
      <label htmlFor="newDeckTitle">
        {" "}
        Deck Name
        <input
          type="text"
          name="newDeckTitle"
          onChange={(e) => changeDeckTitle(e.target.value)}
        ></input>
      </label>
      <button type="submit">New Deck</button>
    </form>
  );
}
