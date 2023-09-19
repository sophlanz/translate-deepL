import React from "react";
import Image from "next/image";
import { useCards } from "../../context/card-context";
import { PrimaryIcon } from "../componentLibrary";
interface Props {
  cardId: string;
}
export default function EditControl({ cardId }: Props): JSX.Element {
  const { updateEditCard } = useCards();
  return (
    <PrimaryIcon src={"/icons/edit.png"} alt={"edit"} height={30} width={30} />
  );
}
