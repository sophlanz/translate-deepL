import React from "react";
import Image from "next/image";
import { useCards } from "../../context/card-context";
export default function DeleteControl(props: { cardId: string }): JSX.Element {
  const { cardId } = props;
  const { cards, updateCards } = useCards();
  const handleDelete = async (e: React.SyntheticEvent, cardId: string) => {
    e.preventDefault();

    await fetch("/api/card/delete?id=" + cardId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        //update context
        const updatedCards = cards.filter((card) => card.id !== cardId);
        updateCards(updatedCards);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div onClick={(e) => handleDelete(e, cardId)}>
      <Image src="/images/trash.png" width={20} height={20} alt="delete" />
    </div>
  );
}
