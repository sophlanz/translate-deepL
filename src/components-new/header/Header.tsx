import React from "react";
import router from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function Header(): JSX.Element {
  const { data: session } = useSession();
  const displayUserName = session?.user ? (
    <h2 className="headerWelcome">Hi, {session.user.name}</h2>
  ) : null;
  const header = (
    <h1 className="headerLogo">
      <Link href="/">
        <span className="headerAI">AI</span> Lengua{" "}
      </Link>
    </h1>
  );

  return (
    <header className="header">
      {header}
      {displayUserName}
    </header>
  );
}
