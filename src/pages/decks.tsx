import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Header } from "../components/header";
import { useSession } from "next-auth/react";
import { DecksContainer } from "../components/deck";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";
import prisma from "../../prisma/lib/prisma";
import { DecksProvider } from "../context/decks-context";
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

const DecksPage: React.FC = ({
  decks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace("/");
    }
  }, [session, router]);
  return (
    <DecksProvider foundDecks={decks}>
      <div>
        <Header />
        <DecksContainer />
      </div>
    </DecksProvider>
  );
};
export default DecksPage;
