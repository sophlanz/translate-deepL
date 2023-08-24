import { getServerSession } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextRequest, NextResponse } from 'next/server';
import authHandler from "../../auth/[...nextauth]";
import prisma from '../../../../../prisma/lib/prisma';

import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";


const options = {
    providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_ID as string,
          clientSecret: process.env.GOOGLE_SECRET as string,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
  };
// POST /api/post
// Required fields in body: title
// Optional fields in body: content
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