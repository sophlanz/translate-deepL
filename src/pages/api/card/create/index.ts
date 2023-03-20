import prisma from '../../../../../prisma/lib/prisma';

export default async function handle(req:any, res:any) {
  const { front, back,deckId } = req.body;
  console.log(deckId)
    const result = await prisma.card.create({
        data: {
          front: front,
          back:back,
          deck: { connect: {id:deckId}  },
        },
      })
    res.json(result);
    console.log(result)
}