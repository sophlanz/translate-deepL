import React from "react";
import Image from "next/image";
import { useDecks } from "@/pages/context/decks-context";
type Props = {
  deckId: string;
};
export default function EditControl(props: Props): JSX.Element {
  const { deckId } = props;
  const { editDeck } = useDecks();
  return (
    <div
      onClick={() => (
        (editDeck.isEditing = !editDeck.isEditing), (editDeck.deckId = deckId)
      )}
    >
      <Image src="/images/edit.png" alt="edit" height={20} width={20} />
    </div>
  );
}
