import React, { createContext, useContext, useState } from "react";
import type { Card } from "../components/card/types.card";
import type { EditCard } from "../components/card/types.card";
type CardContext = {
  currDeckId: string;
  currCardId: string;
  cards: Card[];
  edit: EditCard;
  updateDeckId: (deckId: string) => void;
  updateCardId: (cardId: string) => void;
  updateEditCard: (isEditing: boolean, cardId: string) => void;
  updateCards: (newCards: Card[]) => void;
};
const CardContext = createContext<CardContext | undefined>(undefined);
type CardProviderProps = {
  children: JSX.Element | JSX.Element[];
  savedCards: Card[];
};
export const CardProvider = ({ children, savedCards }: CardProviderProps) => {
  const [cards, setCards] = useState<Card[]>(savedCards);
  const [edit, setEdit] = useState<EditCard>({ isEditing: false, cardId: "" });
  const [currDeckId, setCurrDeckId] = useState<string>("");
  const [currCardId, setCurrCardId] = useState<string>("");
  const updateCards = (newCards: Card[]) => {
    setCards(newCards);
  };
  const updateEditCard = (isEditing: boolean, cardId: string) => {
    setEdit({ isEditing, cardId });
  };
  const updateDeckId = (deckId: string) => {
    setCurrDeckId(deckId);
  };
  const updateCardId = (cardId: string) => {
    setCurrCardId(cardId);
  };
  return (
    <CardContext.Provider
      value={{
        cards,
        edit,
        currDeckId,
        currCardId,
        updateDeckId,
        updateCardId,
        updateEditCard,
        updateCards,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
export const useCards = () => {
  const cardContext = useContext(CardContext);
  if (cardContext === undefined) {
    throw new Error("useCards must be used within a CardProvider");
  }
  return cardContext;
};
