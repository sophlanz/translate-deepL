import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

interface Props {
    sendToParent: React.Dispatch<React.SetStateAction<boolean>>
}
 const Header: React.FC<Props> = (props:Props) => {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname
    const { data: session, status} = useSession();
   
    let message;
    let navBar;
    if(status === 'loading'){
        message = (
            <p>Loading...</p>
        )
    };
    if(!session) {
        if(props) {
            props.sendToParent(()=>false)
        }
        
        navBar = (
            <nav>
                <h1><span>AI</span> Lengua </h1>
                <Link href='/api/auth/signin' 
                data-active={isActive('/signup')}>
                    Login
                </Link>
            </nav>
        )
    }
    // /decks and /deck page only show logout button and logo
   else if(session && window.location.pathname === "/decks" || session && window.location.pathname.includes('/deck/')) {
        
    if(props) {
        props.sendToParent(()=>true)
    }
        navBar=(
            <nav style={{flexDirection:'row'}}>
                <h1><span>AI</span> Lengua </h1>
                <button onClick={()=> signOut()}>Log Out</button>
            </nav>
            
        )
    }
    else {
        if(props) {
            props.sendToParent(()=>true)
        }
        navBar=(
            <nav style={{flexDirection:'column'}}>
                <h1><span>AI</span> Lengua </h1>
                {session.user ?
                <h2>Hi, {session.user.name}. Welcome Back!</h2>
                : null
                }
                <button onClick={()=> signOut()}>Log Out</button>
                <Link href='/decks' data-active={isActive('/')}>
                    Decks
                </Link>
            </nav>
            
        )
    }
    return(
        <>
          {navBar}
        </>
    )
}
export default Header;