import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Nav(): JSX.Element {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session } = useSession();

  const logInLink = (
    <li>
      <Link href="/api/auth/signin" data-active={isActive("/signup")}>
        Login
      </Link>
    </li>
  );
  const logOutLink = <li onClick={() => signOut()}>Log Out</li>;
  const decksLink = (
    <li>
      <Link href="/decks" data-active={isActive("/")}>
        Decks
      </Link>
    </li>
  );

  return (
    <nav>
      <ul>
        {session ? (
          <>
            {decksLink}
            {logOutLink}
          </>
        ) : (
          <>{logInLink}</>
        )}
      </ul>
    </nav>
  );
}
