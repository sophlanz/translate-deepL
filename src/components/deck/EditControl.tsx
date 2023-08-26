import React from "react";
import Image from "next/image";
import { useDecks } from "@/context/decks-context";
type Props = {
  deckId: string;
};
export default function EditControl(props: Props): JSX.Element {
  const { deckId } = props;
  const { changeEditDeck } = useDecks();
  return (
    <div onClick={() => changeEditDeck({ isEditing: true, deckId: deckId })}>
      <Image src="/images/edit.png" alt="edit" height={30} width={30} />
    </div>
  );
}
