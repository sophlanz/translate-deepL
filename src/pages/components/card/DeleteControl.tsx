import React from "react";
import Image from "next/image";
export default function DeleteControl(cardId: string): JSX.Element {
  const handleDelete = async (e: React.SyntheticEvent, cardId: string) => {
    e.preventDefault();
    try {
      await fetch("/api/card/delete?id=" + cardId, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        //refresh to get server side props
        router.replace(router.asPath);
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div onClick={(e) => handleDelete(e, cardId)}>
      <Image src="/images/trash.png" width={20} height={20} alt="delete" />
    </div>
  );
}
