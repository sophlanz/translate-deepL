import React, { useState } from "react";
import { useCards } from "@/context/card-context";
import ErrorMessage from "../errors/ErrorMessage";
import { Form, Label, Input } from "../componentLibrary";
import { PrimaryButton } from "../componentLibrary";
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
    <Form onSubmit={(e) => handleCreateCard(e)}>
      <Label htmlFor={"front"} labelName={"Word"}>
        <Input
          inputType={"text"}
          inputName={"front"}
          value={front}
          onChange={(e) => setFront(e.target.value)}
        />
      </Label>
      <PrimaryButton text={"New Card"} type={"submit"} classes={"form"} />
    </Form>
  );
}
