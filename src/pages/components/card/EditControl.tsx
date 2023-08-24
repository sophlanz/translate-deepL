import React from "react";
import Image from "next/image";
export default function EditControl(cardId: string): JSX.Element {
  return (
    <div onClick={() => setEdit(cardId)}>
      <Image src="/images/edit.png" width={20} height={20} alt="delete" />
    </div>
  );
}
