import React from "react";
import Image from "next/image";
import { useDecks } from "@/context/decks-context";
import { PrimaryIcon } from "../componentLibrary";
interface Props {
  deckId: string;
}
export default function EditControl({ deckId }: Props): JSX.Element {
  const { changeEditDeck } = useDecks();
  return (
    <PrimaryIcon
      src="/icons/edit.png"
      alt="edit"
      height={30}
      width={30}
      onClick={() => changeEditDeck({ isEditing: true, deckId: deckId })}
    />
  );
}
/*  <div onClick={() => changeEditDeck({ isEditing: true, deckId: deckId })}>
      <Image src="/icons/edit.png" alt="edit" height={30} width={30} />
    </div> */
