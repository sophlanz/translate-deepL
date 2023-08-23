import React from "react";
import Image from "next/image";
import router from "next/router";
type Props = {
  deckId: string;
};
export default function DeleteControl(props: Props): JSX.Element {
  const { deckId } = props;
  const handleDelete = async (e: React.SyntheticEvent, deckId: string) => {
    e.preventDefault();
    fetch("/api/deck/delete?id=" + deckId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        //refresh to get server side props
        router.replace(router.asPath);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div onClick={(e) => handleDelete(e, deckId)}>
      <Image src="/images/trash.png" alt="delete" height={20} width={20} />
    </div>
  );
}
