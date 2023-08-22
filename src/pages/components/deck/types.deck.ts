export type editDeck = {
    isEditing: boolean;
    deckId: string;
  };
 export type DecksProviderProps = {
      children:JSX.Element | JSX.Element[];
      
  }
 export type Deck={
      id:string;
      name:string;
      cards:Card[];
  }
 export type Card={
      id:string;
      front:string;
      back:string
    }