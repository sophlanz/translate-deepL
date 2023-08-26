import React from "react";
import Image from "next/image";
import { useDecks } from "@/context/decks-context";
type Props = {
  deckId: string;
};

export default function DeleteControl(props: Props): JSX.Element {
  const { deckId } = props;
  const { decks, updateDecks } = useDecks();
  const handleDelete = async (e: React.SyntheticEvent, deckId: string) => {
    e.preventDefault();
    fetch("/api/deck/delete?id=" + deckId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        //filter the deckid out of decks array, so context can update
        const updatedDecks = decks.filter((deck) => deck.id !== deckId);
        updateDecks(updatedDecks);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div onClick={(e) => handleDelete(e, deckId)}>
      <Image src="/images/trash.png" alt="delete" height={30} width={30} />
    </div>
  );
}
