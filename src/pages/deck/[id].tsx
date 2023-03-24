import prisma from '../../../prisma/lib/prisma'
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import handle from '../api/deck/create';
import Header from '../components/Header';
import Image from 'next/image'
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
    const [edit,setEdit] = useState<any>();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
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
    const handleUpdateCard = async (e:React.SyntheticEvent,cardId:string, cardFront:string,cardBack:string)=>{
        e.preventDefault();
        try{
            //send data to /api/card/update api route
            let body={
                front:front===""? cardFront:front,
                back:back===""?cardBack:back,
                cardId:cardId
            };
            console.log(body);
            await fetch('/api/card/update', {
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
        setEdit(edit.cardId===undefined)
    }
    useEffect(()=> {

    },[cards])
    return (
        <>
        <Header sendToParent={setLoggedIn} />
        <div className="cards">
        <form onSubmit ={(e)=> handleCreateCard(e)}>
            <label htmlFor='front'>Word
                <input name='front'type="text" onChange={(e)=> setFront(e.target.value)}/>
            </label>
            <label htmlFor='back'>Translation
                <input name='back'type="text" onChange={(e)=> setBack(e.target.value)}/>
            </label>
            <button type="submit">New Card</button>
        </form>
        <div className="card">
            <h2>Word</h2>
            <h2>Translation</h2>
            <h2>Controls</h2>
        </div>
        {
              cards.map((card:any)=> {
                return(
                <div className="card">
                    <div className="cardFront">
                        <p>{card.front}</p>
                    </div>
                   <div className="cardBack">
                        <p>{card.back}</p>
                    </div>
                    <div className="cardControls">
                        <div onClick={(e)=> handleDelete(e,card.id)}>
                            <Image src="/images/trash.png" width={20} height={20} alt="delete"/>
                        </div>
                        <div onClick={()=> setEdit(card.id)}>
                        <Image src="/images/edit.png" width={20} height={20} alt="delete"/>
                        </div>
                    </div>
                    {
                        edit===card.id ?
                        <form onSubmit ={(e)=> handleUpdateCard(e, card.id, card.front, card.back)}>
                        <label htmlFor='front'>Front
                            <input name='front'type="text" onChange={(e)=> setFront(e.target.value)}/>
                        </label>
                        <label htmlFor='back'>Back
                            <input name='back'type="text"  onChange={(e)=> setBack(e.target.value)}/>
                        </label>
                        <button type="submit">Submit</button>
                        </form>
                        :
                        null
                    }
                </div>
                )
            })
        }
        </div>
        
      
        </>
    )
}
export default Cards;