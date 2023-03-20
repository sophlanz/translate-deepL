import React, { useState,useEffect }from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {  useSession, getSession } from 'next-auth/react';
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
        //matching email
      where: {
        user: { email: session?.user?.email },
      },
      //only return the name
      select: { name: true, id:true},
      
    });
    return {
      props: { decks },
    };
  };
  

 
 const Decks: React.FC  = ({ decks }: InferGetServerSidePropsType <typeof getServerSideProps>) => {
   
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname

  
    const [title,setTitle] = useState<string>('')
     const router = useRouter();
    const handleCreateDeck = async (e: React.SyntheticEvent) => {
            e.preventDefault();
            try{
                //send data to /api/create-deck api route
                let body={title};
                await fetch('/api/deck/create', {
                    method:"POST",
                    headers:{'Content-Type': 'application/json'},
                    body:JSON.stringify(body)
                }).then(()=> {
                    //refresh to get server side props
                    router.replace(router.asPath);
                })
            } catch(error) {
                console.log(error)
            }
    };
    const [loading, setLoading] = useState(false);
    const handleDelete = async (e:React.SyntheticEvent,postId:string) => {
        e.preventDefault();
      try {
        setLoading(true);
        await fetch('/api/deck/delete?id=' + postId, {
          method: "DELETE",
          headers: {"Content-Type": "application/json"}
        }).then(()=> {
            //refresh to get server side props
            router.replace(router.asPath);
            setLoading(false);
        })
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
  
    }
    useEffect(()=> {
       
    },[decks]) 
    console.log(decks);
    return(
        <>
           <form onSubmit={handleCreateDeck}>
            <label htmlFor='newDeckTitle'> Deck Name
            <input type="text" name="newDeckTitle" onChange={(e)=>setTitle(e.target.value) }></input>
            </label>
            <button type="submit">New Deck</button>
            </form>
            <div className="decks">
                {decks.map((deck:any)=> {
                    return(
                        <div className="deck">
                            <Link href={`/deck/${deck.id}`} data-active={isActive('/')}> {deck.name} </Link>
                            <button onClick={(e)=>handleDelete(e,deck.id)}>{loading ? "Loading": "Delete"}</button>

                        </div>
                    )
                       
                })}
            </div>
        </>
    )
 }
 export default Decks;