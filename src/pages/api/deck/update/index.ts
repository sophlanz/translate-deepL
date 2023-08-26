import prisma from '../../../../../prisma/lib/prisma';

export default async function handle(req:any, res:any) {
    const {title, deckId} = req.body;
    try{
      const post = await prisma.deck.update({
        where: { id: deckId },
        data: {
          name: title,
        },
      });
      res.json(post);
    }catch(error){
      console.log(error)
      res.status(500).json({ error: 'An error occurred while updating the deck.' });
    }
   
  }