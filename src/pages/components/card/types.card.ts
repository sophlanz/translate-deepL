export type Card = {
    front:string;
    back:string;
    id:string;
    deckId:string | null;
}
export type EditCard = {
    isEditing:boolean;
    cardId:string;
}