import React from "react";
import Quote from "./Quote";
import { DecksProvider } from "../../context/decks-context";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import prisma from "../../../../prisma/lib/prisma";
import NewDeckForm from "./NewDeckForm";
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
const DecksContainer: React.FC = ({
  decks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <DecksProvider foundDecks={decks}>
      <Quote />
      <div className="decks">
        <NewDeckForm />
      </div>
    </DecksProvider>
  );
};
export default DecksContainer;
