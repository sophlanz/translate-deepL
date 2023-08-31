import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Header(): JSX.Element {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session, status } = useSession();
  let message;
  let navBar;
  if (status === "loading") {
    message = <p>Loading...</p>;
  }
  if (!session) {
    navBar = (
      <nav>
        <h1>
          <Link href="/">
            <span>AI</span> Lengua{" "}
          </Link>
        </h1>
        <ul>
          <li>
            <Link href="/api/auth/signin" data-active={isActive("/signup")}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
  // /decks and /deck page only show logout button and logo
  else if (
    (session && window.location.pathname === "/decks") ||
    (session && window.location.pathname.includes("/deck/"))
  ) {
    navBar = (
      <nav style={{ flexDirection: "row" }}>
        <h1>
          <Link href="/">
            <span>AI</span> Lengua{" "}
          </Link>
        </h1>
        <ul>
          <li onClick={() => signOut()}>Log Out</li>
        </ul>
      </nav>
    );
  } else {
    navBar = (
      <nav style={{ flexDirection: "row" }}>
        <section className="greeting">
          <h1>
            <Link href="/">
              <span>AI</span> Lengua{" "}
            </Link>
          </h1>
          <h2>{session.user ? <h2>Hi, {session.user.name}</h2> : null}</h2>
        </section>
        <ul>
          <li onClick={() => signOut()}>Log Out</li>
          <li>
            <Link href="/decks" data-active={isActive("/")}>
              Decks
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
  return <>{navBar}</>;
}
