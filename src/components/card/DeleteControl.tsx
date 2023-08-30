import React, { useState } from "react";
import Image from "next/image";
import { useCards } from "../../context/card-context";
import ErrorMessage from "../errors/ErrorMessage";
enum Status {
  idle,
  Loading,
  Error,
}
interface Props {
  cardId: string;
}
export default function DeleteControl({ cardId }: Props): JSX.Element {
  const { cards, updateCards } = useCards();
  const [status, setStatus] = useState<Status>(Status.idle);
  const [error, setError] = useState<Error | undefined>();
  const handleDelete = async (e: React.SyntheticEvent, cardId: string) => {
    e.preventDefault();
    setStatus(Status.Loading);
    fetch("/api/card/delete?id=" + cardId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        //update context
        const updatedCards = cards.filter((card) => card.id !== cardId);
        updateCards(updatedCards);
        setStatus(Status.idle);
      })
      .catch((error: Error) => {
        console.log(error);
        setStatus(Status.Error);
        setError(error);
      });
    if (status === Status.Error) {
      <ErrorMessage error={error} />;
    }
  };
  return (
    <div onClick={(e) => handleDelete(e, cardId)}>
      <Image src={"/images/trash.png"} width={30} height={30} alt="delete" />
    </div>
  );
}
