import React, { use } from "react";
import { useDecks } from "../../../pages/context/decks-context";
import router from "next/router";
export default function EditDeckForm(deckId: string): JSX.Element {
  const { editDeck, changeDeckTitle, deckTitle } = useDecks();
  const handleUpdateDeck = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //send data to /api/card/update api route
    const body = {
      title: deckTitle,
      deckId: deckId,
    };
    await fetch("/api/deck/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(() => {
        //refresh to get server side props
        router.replace(router.asPath);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {/*Only if we're editing this specific ID */}
      {editDeck.deckId === deckId ? (
        <form onSubmit={(e) => handleUpdateDeck(e)}>
          <label htmlFor="newDeckName">
            Name
            <input
              onChange={(e) => changeDeckTitle(e.target.value)}
              name="newDeckName"
            />
          </label>
          <button type="submit">submit</button>
        </form>
      ) : null}
    </>
  );
}
