import prisma from '../../../../prisma/lib/prisma';

export default async function handle(req:any, res:any) {
    const {title, deckId} = req.body;
    const post = await prisma.deck.update({
      where: { id: deckId },
      data: {
        name: title,
      },
    });
    res.json(post);
  }