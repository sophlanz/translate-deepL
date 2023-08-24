import React from "react";
import Quote from "./Quote";
import NewDeckForm from "./NewDeckForm";
import Decks from "./Decks";
/* export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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
  console.log(decks);
  return {
    props: { decks },
  };
}; */
export default function DecksContainer(): JSX.Element {
  return (
    <>
      <Quote />
      <div className="decks">
        <NewDeckForm />
        <Decks />
      </div>
    </>
  );
}
