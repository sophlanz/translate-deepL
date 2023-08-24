import prisma from "../../../prisma/lib/prisma";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import { useCards } from "../context/card-context";
import { CardProvider } from "../context/card-context";
import { CardsContainer } from "../components/card";
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const deckId = String(params?.id);
  const cards = await prisma.card.findMany({
    where: {
      deckId: String(params?.id),
    },
    select: { front: true, back: true, id: true, deckId: true },
  });
  return {
    //pass deckId even if cards array is empty
    props: { cards, deckId },
  };
};
const Cards: React.FC = ({
  cards,
  deckId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: session } = useSession();
  /*   const { updateDeckId } = useCards();
  updateDeckId(deckId); */

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [cards, session]);
  return (
    <>
      <CardProvider savedCards={cards}>
        <Header />
        <CardsContainer />
      </CardProvider>
    </>
  );
};
export default Cards;
