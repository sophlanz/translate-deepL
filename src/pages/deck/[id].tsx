import prisma from '../../../prisma/lib/prisma'
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next'
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const cards = await prisma.card.findMany({
      where: {
        deckId: String(params?.id),
      },
     select: { front:true, back:true, id:true }
    });
    return {
      props: {cards} ,
    };
  };
const Cards: React.FC  = ({ cards }: InferGetServerSidePropsType <typeof getServerSideProps>) => {
    return (
        cards.map((card:any)=> {
            return(
            <div className="card">
                <p>{card.front}</p>
                <p>{card.back}</p>
            </div>
            )
        })
    )
}
export default Cards;