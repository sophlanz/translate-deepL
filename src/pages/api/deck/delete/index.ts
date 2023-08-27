import prisma from '../../../../../prisma/lib/prisma';

export default async function handle(req:any, res:any) {
    try{
        const result = await prisma.deck.delete({
            where: {
                id: req.query.id,
            }
        });
        res.json(result);
    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'An error occurred while deleting the deck.' });
    }

  }