import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

 const Decks: React.FC = () => {

    return(
        <>
            <button>Create new Deck</button>
        </>
    )
 }
 export default Decks;