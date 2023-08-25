import React, { useContext, createContext, useState } from "react";
import type { editDeck } from "../components/deck/types.deck";
import type { Deck } from "../components/deck/types.deck";
type DecksContextType = {
  deckTitle: string;
  currDeckId: string;
  editDeck: editDeck;
  decks: Deck[];
  changeDeckTitle: (newTitle: string) => void;
  changeCurrDeckId: (deckId: string) => void;
  changeEditDeck: (newEditDeck: editDeck) => void;
  updateDecks: (newDecks: Deck[]) => void;
};
const DecksContext = createContext<DecksContextType | undefined>(undefined);
type DecksProviderProps = {
  children: JSX.Element | JSX.Element[];
  foundDecks: Deck[];
};
export const DecksProvider = ({ children, foundDecks }: DecksProviderProps) => {
  const [deckTitle, setDeckTitle] = useState<string>("");
  const [currDeckId, setCurrDeckId] = useState<string>("");
  const [editDeck, setEditDeck] = useState<editDeck>({
    isEditing: false,
    deckId: "",
  });
  const [decks, setDecks] = useState<Deck[]>(foundDecks);
  const changeDeckTitle = (newTitle: string) => {
    setDeckTitle(newTitle);
  };
  const changeCurrDeckId = (deckId: string) => {
    setCurrDeckId(deckId);
  };
  const changeEditDeck = (newEditDeck: editDeck) => {
    setEditDeck(newEditDeck);
  };
  const updateDecks = (newDecks: Deck[]) => {
    setDecks(newDecks);
  };
  return (
    <DecksContext.Provider
      value={{
        deckTitle,
        changeDeckTitle,
        editDeck,
        changeEditDeck,
        decks,
        updateDecks,
        currDeckId,
        changeCurrDeckId,
      }}
    >
      {children}
    </DecksContext.Provider>
  );
};
export const useDecks = () => {
  const decksContext = useContext(DecksContext);
  if (decksContext === undefined) {
    throw new Error("useDecks must be used within a DecksProvider");
  }
  return decksContext;
};
