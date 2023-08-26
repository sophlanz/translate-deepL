import prisma from '../../../../../prisma/lib/prisma';

export default async function handle(req:any, res:any) {
  const { front, back,deckId } = req.body;
  try{
    const result = await prisma.card.create({
      data: {
        front: front,
        back:back,
        deck: { connect: {id:deckId}  },
      },
    })
  res.json(result);
  }catch(error){
    console.error("Error creating card:", error);
    res.status(500).json({ error: "An error ocurred while creating the card" });
  }
  
}