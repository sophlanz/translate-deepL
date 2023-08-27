import React from "react";
import { useDecks } from "@/context/decks-context";
import ErrorMessage from "../errors/ErrorMessage";
enum Status {
  Idle,
  Loading,
  Error,
}
export default function NewDeckForm(): JSX.Element {
  const { deckTitle, changeDeckTitle, decks, updateDecks } = useDecks();
  const [status, setStatus] = React.useState<Status>(Status.Idle);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  console.log(deckTitle);
  const handleCreateDeck = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStatus(Status.Loading);
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
          changeDeckTitle("");
          setStatus(Status.Idle);
        } else {
          console.log("request failed with status", response.status);
          setStatus(Status.Error);
          setError(error);
        }
      })
      .catch((error) => {
        console.log(error);
        setStatus(Status.Error);
        setError(error);
      });
  };
  if (status === Status.Error) {
    return <ErrorMessage error={error} />;
  }
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
