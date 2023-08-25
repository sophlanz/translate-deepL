import prisma from '../../../../prisma/lib/prisma';

export default async function handle(req:any, res:any) {
    console.log(req.body);
    const {front, back, cardId} = req.body;
    console.log(front,back,cardId)
    const post = await prisma.card.update({
      where: { id: cardId },
      data: {
          front: front,
          back:back,
       },
    });
    res.json(post);
  }