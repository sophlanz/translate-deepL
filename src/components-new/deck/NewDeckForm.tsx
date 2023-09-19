import React from "react";
import { useDecks } from "@/context/decks-context";
import ErrorMessage from "../errors/ErrorMessage";
import { PrimaryButton } from "../componentLibrary/buttons/PrimaryButton";
import { Form, Label, Input } from "../componentLibrary";
enum Status {
  Idle,
  Loading,
  Error,
}
export default function NewDeckForm(): JSX.Element {
  const { deckTitle, changeDeckTitle, decks, updateDecks } = useDecks();
  const [status, setStatus] = React.useState<Status>(Status.Idle);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const handleCreateDeck = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStatus(Status.Loading);
    //send data to /api/create-deck api route
    fetch("/api/deck/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: deckTitle }),
    })
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        //update context with new deck
        const { name, id } = data;
        const newDeck = { name, id };
        const updatedDecks = [...decks, newDeck];
        updateDecks(updatedDecks);
        changeDeckTitle("");
        setStatus(Status.Idle);
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
  console.log(deckTitle);
  return (
    <Form onSubmit={handleCreateDeck}>
      <Label htmlFor={"newDeckTitle"} labelName={"Deck Name"}>
        <Input
          inputType={"text"}
          inputName={"newDeckTitle"}
          value={deckTitle}
          onChange={(e) => changeDeckTitle(e.target.value)}
        />
      </Label>
      <PrimaryButton text={"New Deck"} type={"submit"} />
    </Form>
  );
}
