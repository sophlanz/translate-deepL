import React from "react";
import Image from "next/image";
import { useCards } from "../../context/card-context";
interface Props {
  cardId: string;
}
export default function EditControl({ cardId }: Props): JSX.Element {
  const { updateEditCard } = useCards();
  return (
    <div onClick={() => updateEditCard(true, cardId)}>
      <Image src="/icons/edit.png" width={30} height={30} alt="Edit" />
    </div>
  );
}
