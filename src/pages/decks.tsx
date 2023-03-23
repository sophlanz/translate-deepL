import React, { useState,useEffect }from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next'
import prisma from '../../prisma/lib/prisma'
import Header from './components/Header';
import Image from 'next/image';
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
    const [edit,setEdit] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
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
    const handleDelete = async (e:React.SyntheticEvent,deckId:string) => {
        e.preventDefault();
      try {
        setLoading(true);
        await fetch('/api/deck/delete?id=' + deckId, {
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
    const handleUpdateDeck = async (e:React.SyntheticEvent,deckId:string)=>{
      e.preventDefault();
      try{
          //send data to /api/card/update api route
          let body={
              title:title,
              deckId:deckId
          };
          await fetch('/api/deck/update', {
              method:"PUT",
              headers:{'Content-Type': 'application/json'},
              body:JSON.stringify(body)
          }).then(()=> {
              //refresh to get server side props
              router.replace(router.asPath);
          })
      } catch(error) {
          console.log(error)
      }
    }
    useEffect(()=> {
       
    },[decks]) 
    console.log(decks);
    return(
        <>
          <Header  sendToParent={setLoggedIn} />
          <div className="quote">
             <p>"If you talk to a man in a language he understands, that goes to his <span style={{fontWeight:"bolder"}}>head</span>.
                 If you talk to him in his own language, that goes to his <span style={{fontWeight:"bolder"}}>heart</span>."</p>
            <p style={{fontStyle:"italic"}}> - Nelson Mandela</p>
          </div>
            <div className="decks">
               <form onSubmit={handleCreateDeck}>
                  <label htmlFor='newDeckTitle'> Deck Name
                  <input type="text" name="newDeckTitle" onChange={(e)=>setTitle(e.target.value) }></input>
                  </label>
                  <button type="submit">New Deck</button>
               </form>
                {decks.map((deck:any)=> {
                    return(
                        <div className="deck">
                            <Link href={`/deck/${deck.id}`} data-active={isActive('/')}> {deck.name} </Link>
                            <div className="deckControls">
                            <div onClick={(e)=>handleDelete(e,deck.id)}>
                                <Image src='/images/trash.png' alt="delete" height={20} width={20} />
                            </div>
                            
                            <div onClick={()=> setEdit(!edit)}>
                                <Image src='/images/edit.png' alt="edit" height={20} width={20}/>
                            </div>
                            </div>
                            {
                              edit ?
                              <form onSubmit={(e)=>handleUpdateDeck(e,deck.id)}>
                                <label htmlFor="newDeckName">Name
                                  <input onChange={(e)=>setTitle(e.target.value)} name="newDeckName"/>
                                </label>
                                <button type="submit">submit</button>
                              </form>
                              :
                              null
                            }
                        </div>
                    )
                       
                })}
            </div>
        </>
    )
 }
 export default Decks;