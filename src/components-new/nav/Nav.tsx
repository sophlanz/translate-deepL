import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import HamburgerButton from "../ui/buttons/HamburgerButton";
export default function Nav(): JSX.Element {
  const [navElement, setNavElement] = useState<HTMLElement | null>(null);
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session } = useSession();
  const toggleNavVisibility = () => {
    if (navElement) {
      navElement.style.visibility = "hidden";
    }
  };
  const logInLink = (
    <li className="navListItem">
      <Link href="/api/auth/signin" data-active={isActive("/signup")}>
        Login
      </Link>
    </li>
  );
  const logOutLink = (
    <li className="navListItem" onClick={() => signOut()}>
      Log Out
    </li>
  );
  const decksLink = (
    <li className="navListItem">
      <Link href="/decks" data-active={isActive("/")}>
        Decks
      </Link>
    </li>
  );
  useEffect(() => {
    setNavElement(document.getElementById("navigation-drawer"));
  }, []);
  return (
    //show nav when we show ul
    <nav className="nav">
      <HamburgerButton nav={navElement} />
      <ul
        id="navigation-drawer"
        className="navList"
        onClick={toggleNavVisibility}
      >
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
