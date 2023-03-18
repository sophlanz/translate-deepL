import React, { useState }from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';

 const Decks: React.FC = () => {
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
        </>
    )
 }
 export default Decks;