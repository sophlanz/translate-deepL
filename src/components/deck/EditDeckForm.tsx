import React, { useEffect, useState } from "react";
import { useDecks } from "../../context/decks-context";
import router from "next/router";
type Props = {
  deckId: string;
};
export default function EditDeckForm(props: Props): JSX.Element {
  const { deckId } = props;
  const { editDeck, changeDeckTitle, decks, changeEditDeck } = useDecks();
  const [newDeckName, setNewDeckName] = useState<string>("");
  const handleUpdateDeck = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //send data to /api/card/update api route
    const body = {
      title: newDeckName,
      deckId: deckId,
    };
    await fetch("/api/deck/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(() => {
        //update context with new name
        changeDeckTitle(newDeckName);
        //update decks array in context
        decks.map((deck) => {
          if (deck.id === deckId) {
            deck.name = newDeckName;
          }
        });
        //set isEditing back to false and deckId back to empty string
        changeEditDeck({ deckId: "", isEditing: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {/*Only if we're editing this specific ID */}
      {editDeck.deckId === deckId ? (
        <form key={deckId} onSubmit={(e) => handleUpdateDeck(e)}>
          <label htmlFor="newDeckName">
            Name
            <input
              onChange={(e) => setNewDeckName(e.target.value)}
              name="newDeckName"
              value={newDeckName}
            />
          </label>
          <button type="submit">submit</button>
        </form>
      ) : null}
    </>
  );
}
