import prisma from '../../../../../prisma/lib/prisma';

export default async function handle(req:any, res:any) {
    const {front, back, cardId} = req.body;
    try{
      const post = await prisma.card.update({
        where: { id: cardId },
        data: {
            front: front,
            back:back,
         },
      });
      res.json(post);
    }catch(error){
      console.log('Error occurred while updating the card',error)
      res.status(500).json({ error: 'An error occurred while updating the card.' });
    }
  
  }