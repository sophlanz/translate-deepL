import React from "react";
import Image from "next/image";
import { useDecks } from "@/context/decks-context";
interface Props {
  deckId: string;
}
export default function EditControl({ deckId }: Props): JSX.Element {
  const { changeEditDeck } = useDecks();
  return (
    <div onClick={() => changeEditDeck({ isEditing: true, deckId: deckId })}>
      <Image src="/icons/edit.png" alt="edit" height={30} width={30} />
    </div>
  );
}
