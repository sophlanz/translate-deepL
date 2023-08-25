import prisma from '../../../../prisma/lib/prisma';


export default async function handle(req:any, res:any) {
    const result = await prisma.card.delete({
        where: {
            id: req.query.id,
        }
    });
    res.json(result);
  }