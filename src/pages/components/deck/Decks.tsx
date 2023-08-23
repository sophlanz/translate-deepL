import React, { use, useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import router from "next/router";
import Image from "next/image";
import uniqid from "uniqid";
import EditDeckForm from "./EditDeckForm";
import DeleteControl from "./DeleteControl";
import EditControl from "./EditControl";
import type { Deck } from "./types.deck";
import { useDecks } from "@/pages/context/decks-context";
enum Status {
  Idle,
  Loading,
  Error,
}
export default function Decks(): JSX.Element {
  const [decksState, setDecksState] = useState<Status>(Status.Idle);
  const { decks, deckTitle } = useDecks();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <>
      {decks.map((deck: Deck) => {
        return (
          <div key={uniqid()} className="deck">
            <Link href={`/deck/${deck.id}`} data-active={isActive("/")}>
              {" "}
              {deck.name}{" "}
            </Link>
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
