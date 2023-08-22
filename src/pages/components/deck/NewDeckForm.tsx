import React, { useState } from "react";
import router from "next/router";
export default function NewDeckForm(): JSX.Element {
  const [deckTitle, setDeckTitle] = useState<string>("");
  const handleCreateDeck = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      //send data to /api/create-deck api route
      let body = { deckTitle };
      fetch("/api/deck/create", {
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
    <form onSubmit={handleCreateDeck}>
      <label htmlFor="newDeckTitle">
        {" "}
        Deck Name
        <input
          type="text"
          name="newDeckTitle"
          onChange={(e) => setDeckTitle(e.target.value)}
        ></input>
      </label>
      <button type="submit">New Deck</button>
    </form>
  );
}
