import React, { useState }from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession, getSession } from 'next-auth/react';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next'
import prisma from '../../prisma/lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    if (!session) {
      res.statusCode = 403;
      return { props: { decks: [] } };
    }
  
    const decks = await prisma.deck.findMany({
      where: {
        user: { email: session?.user?.email },
      },
      select: { name: true },
      
    });
    return {
      props: { decks },
    };
  };
  
 
 const Decks: React.FC  = ({ decks }: InferGetServerSidePropsType <typeof getServerSideProps>) => {
    const [newDeck,setNewDeck] = useState<boolean>(false)
    const [title,setTitle] = useState<string>('')
    const handleCreateDeck = async (e: React.SyntheticEvent) => {
            e.preventDefault();
            try{
                //send data to /api/create-deck api route
                let body={title};
                await fetch('/api/create-deck', {
                    method:"POST",
                    headers:{'Content-Type': 'application/json'},
                    body:JSON.stringify(body)
                });
            } catch(error) {
                console.log(error)
            }
    };
    console.log(decks);
    return(
        <>
            <h3 onClick={()=> setNewDeck(!newDeck)} >New Deck</h3>
            {newDeck ? 
            null:
            <label htmlFor='newDeckTitle'> Title
            <input type="text" name="newDeckTitle" onChange={(e)=>setTitle(e.target.value) }></input>
            </label>
            }
            <button onClick={handleCreateDeck}>New Deck</button>
            <div className="decks">
                {decks.map((deck:any)=> {
                    return(
                        <div className="deck">
                            <p>{deck.name}</p>
                        </div>
                    )
                       
                })}
            </div>
        </>
    )
 }
 export default Decks;