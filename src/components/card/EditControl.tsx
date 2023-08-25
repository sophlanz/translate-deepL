import React from "react";
import Image from "next/image";
import { useCards } from "../../context/card-context";
export default function EditControl(props: { cardId: string }): JSX.Element {
  const { cardId } = props;
  const { updateEditCard } = useCards();
  return (
    <div onClick={() => updateEditCard(true, cardId)}>
      <Image src="/images/edit.png" width={20} height={20} alt="Edit" />
    </div>
  );
}
