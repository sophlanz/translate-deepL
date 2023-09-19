import prisma from "../../../prisma/lib/prisma";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import React from "react";
import { CardProvider } from "../../context/card-context";
import { CardsContainer } from "../../components/card";
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const deckId = String(params?.id);
  const cards = await prisma.card.findMany({
    where: {
      deckId,
    },
    select: { front: true, back: true, id: true, deckId: true },
  });
  return {
    props: { cards },
  };
};
const Cards: React.FC = ({
  cards,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <CardProvider savedCards={cards}>
        {/*       <Header /> */}
        <CardsContainer />
      </CardProvider>
    </>
  );
};
export default Cards;
