import prisma from '../../../prisma/lib/prisma'
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import handle from '../api/deck/create';
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const deckId = String(params?.id)
    const cards = await prisma.card.findMany({
      where: {
        deckId: String(params?.id),
      },
     select: { front:true, back:true, id:true, deckId:true }
    });
    return {
        //pass deckId even if cards array is empty
      props: {cards,deckId} ,
    };
  
  };
const Cards: React.FC  = ({ cards, deckId}: InferGetServerSidePropsType <typeof getServerSideProps>) => {
    const router = useRouter();
    const [loading,setLoading] = useState<boolean>(false)
    const [front,setFront] = useState<string>('');
    const [back,setBack] = useState<string>('');
    const handleDelete = async(e:React.SyntheticEvent, cardId:string) => {
        e.preventDefault();
        try {
            setLoading(true);
            await fetch('/api/card/delete?id=' + cardId, {
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
    const handleCreateCard = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        try{
            //send data to /api/create-deck api route
            let body={
                front:front,
                back:back,
                deckId:deckId
            };
            await fetch('/api/card/create', {
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
    }
    useEffect(()=> {

    },[cards])
    return (
        <>
        <h1>Cards</h1>
        <form onSubmit ={(e)=> handleCreateCard(e)}>
        <label htmlFor='front'>Front
            <input name='front'type="text" onChange={(e)=> setFront(e.target.value)}/>
        </label>
        <label htmlFor='back'>Back
            <input name='back'type="text" onChange={(e)=> setBack(e.target.value)}/>
        </label>
        <button type="submit">New Card</button>
        </form>
        {
              cards.map((card:any)=> {
                return(
                <div className="card">
                    <p>{card.front}</p>
                    <p>{card.back}</p>
                    <button onClick={(e)=> handleDelete(e,card.id)}>{loading ? "loading" : 'delete'}</button>
                </div>
                )
            })
        }
      
        </>
    )
}
export default Cards;