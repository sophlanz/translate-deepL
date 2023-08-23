import React, { use, useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import router from "next/router";
import Image from "next/image";
import uniqid from "uniqid";
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
  const handleDelete = async (e: React.SyntheticEvent, deckId: string) => {
    e.preventDefault();
    setDecksState(Status.Loading);
    await fetch("/api/deck/delete?id=" + deckId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        //refresh to get server side props
        router.replace(router.asPath);
        setDecksState(Status.Idle);
      })
      .catch((error) => {
        console.log("error", error);
        setDecksState(Status.Error);
      });
  };

  const handleUpdateDeck = async (e: React.SyntheticEvent, deckId: string) => {
    e.preventDefault();
    //send data to /api/card/update api route
    const body = {
      title: deckTitle,
      deckId: deckId,
    };
    setDecksState(Status.Loading);
    await fetch("/api/deck/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(() => {
        //refresh to get server side props
        router.replace(router.asPath);
        setDecksState(Status.Idle);
      })
      .catch((error) => {
        console.log(error);
        setDecksState(Status.Error);
      });
  };
  return (
    <>
      {decks.map((deck: any) => {
        return (
          <div key={uniqid()} className="deck">
            <Link href={`/deck/${deck.id}`} data-active={isActive("/")}>
              {" "}
              {deck.name}{" "}
            </Link>
            <div className="deckControls">
              <div onClick={(e) => handleDelete(e, deck.id)}>
                <Image
                  src="/images/trash.png"
                  alt="delete"
                  height={20}
                  width={20}
                />
              </div>
              <div onClick={() => setEdit(!edit)}>
                <Image
                  src="/images/edit.png"
                  alt="edit"
                  height={20}
                  width={20}
                />
              </div>
            </div>
            {edit ? (
              <form onSubmit={(e) => handleUpdateDeck(e, deck.id)}>
                <label htmlFor="newDeckName">
                  Name
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    name="newDeckName"
                  />
                </label>
                <button type="submit">submit</button>
              </form>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
