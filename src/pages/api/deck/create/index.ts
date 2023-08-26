import { getServerSession } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../prisma/lib/prisma';
import {options} from '../../auth/[...nextauth]'

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  const { title } = req.body;
  const session = await getServerSession(req,res,options); 
  if(session?.user?.email ) {
try{
    const result = await prisma.deck.create({
        data: {
          name: title,
          user: { connect: { email: session.user.email } },
        },
      });
      res.json(result);
} catch(error){
  console.error("Error creating deck:", error);
  res.status(500).json({ error: "Internal server error" });
}
  } else {
    res.status(401).json({ error: 'You must be logged in' });
  }
}