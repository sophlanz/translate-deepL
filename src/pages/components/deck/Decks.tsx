import React, { useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import router from "next/router";
import Image from "next/image";
import prisma from "../../../../prisma/lib/prisma";
import uniqid from "uniqid";
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { decks: [] } };
  }
  const decks = await prisma.deck.findMany({
    //matching email
    where: {
      user: { email: session?.user?.email },
    },
    //only return the name
    select: { name: true, id: true },
  });
  return {
    props: { decks },
  };
};
enum Status {
  Idle,
  Loading,
  Error,
}
const Decks: React.FC = ({
  decks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [decksState, setDecksState] = useState<Status>(Status.Idle);
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const handleDelete = async (e: React.SyntheticEvent, deckId: string) => {
    e.preventDefault();
    try {
      setDecksState(Status.Loading);
      await fetch("/api/deck/delete?id=" + deckId, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        //refresh to get server side props
        router.replace(router.asPath);
        setDecksState(Status.Idle);
      });
    } catch (error) {
      console.log("error", error);
      setDecksState(Status.Error);
    }
  };

  const handleUpdateDeck = async (e: React.SyntheticEvent, deckId: string) => {
    e.preventDefault();
    try {
      //send data to /api/card/update api route
      let body = {
        title: title,
        deckId: deckId,
      };
      setDecksState(Status.Loading);
      await fetch("/api/deck/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(() => {
        //refresh to get server side props
        router.replace(router.asPath);
        setDecksState(Status.Idle);
      });
    } catch (error) {
      setDecksState(Status.Error);
    }
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
};
