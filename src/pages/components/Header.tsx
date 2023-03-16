import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

 const Header: React.FC = () => {
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
        navBar = (
            <nav>
                <Link href='/api/auth/signin' 
                data-active={isActive('/signup')}>
                    Login
                </Link>
            </nav>
        )
    }
    if(session) {
        navBar=(
            <nav>
                <Link href='/decks' data-active={isActive('/')}>
                    Decks
                </Link>
                {session.user ?
                <p>{session.user.name}</p>
                : null
                }
                <button onClick={()=> signOut()}>Log Out</button>
                
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