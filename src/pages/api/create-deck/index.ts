import { getSession } from 'next-auth/react';
import prisma from '../../../../prisma/lib/prisma';


// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req:any, res:any) {
  const { title } = req.body;

  const session = await getSession({ req });
  if(session?.user?.email ) {
    const result = await prisma.deck.create({
        data: {
          name: title,
          user: { connect: { email: session.user.email } },
        },
      });
      res.json(result);
  }
 
}