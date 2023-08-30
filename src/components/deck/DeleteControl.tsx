import React from "react";
import Image from "next/image";
import { useDecks } from "@/context/decks-context";
import ErrorMessage from "../errors/ErrorMessage";
interface Props {
  deckId: string;
}
enum Status {
  Idle,
  Loading,
  Error,
}
export default function DeleteControl({ deckId }: Props): JSX.Element {
  const { decks, updateDecks } = useDecks();
  const [status, setStatus] = React.useState<Status>(Status.Idle);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const handleDelete = async (e: React.SyntheticEvent, deckId: string) => {
    e.preventDefault();
    setStatus(Status.Loading);
    fetch("/api/deck/delete?id=" + deckId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        //filter the deckid out of decks array, so context can update
        const updatedDecks = decks.filter((deck) => deck.id !== deckId);
        updateDecks(updatedDecks);
        setStatus(Status.Idle);
      })
      .catch((error) => {
        console.log("error", error);
        setStatus(Status.Error);
        setError(error);
      });
  };
  if (status === Status.Error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <div onClick={(e) => handleDelete(e, deckId)}>
      <Image src="/images/trash.png" alt="delete" height={30} width={30} />
    </div>
  );
}
