import React, { useState } from "react";
import router from "next/router";
import { useDecks } from "@/pages/context/decks-context";
export default function NewDeckForm(): JSX.Element {
  const { deckTitle, changeDeckTitle } = useDecks();

  const handleCreateDeck = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //send data to /api/create-deck api route
    fetch("/api/deck/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deckTitle),
    })
      .then(() => {
        //refresh to get server side props
        router.replace(router.asPath);
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
