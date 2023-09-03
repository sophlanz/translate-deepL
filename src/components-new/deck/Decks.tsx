import React from "react";
import Link from "next/link";
import uniqid from "uniqid";
import EditDeckForm from "./EditDeckForm";
import DeleteControl from "./DeleteControl";
import EditControl from "./EditControl";
import type { Deck } from "./types.deck";
import { useDecks } from "@/context/decks-context";
enum Status {
  Idle,
  Loading,
  Error,
}
export default function Decks(): JSX.Element {
  const { decks } = useDecks();

  return (
    <>
      {decks.map((deck: Deck) => {
        return (
          <div key={uniqid()} className="deck">
            <Link href={`/deck/${deck.id}`}> {deck.name} </Link>
            <div className="deckControls">
              <DeleteControl deckId={deck.id} />
              <EditControl deckId={deck.id} />
            </div>
            <EditDeckForm deckId={deck.id} />
          </div>
        );
      })}
    </>
  );
}
