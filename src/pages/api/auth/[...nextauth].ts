import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";
 import prisma from '../../../../prisma/lib/prisma'; 

export const options = {
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
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
