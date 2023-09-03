import React from "react";
import router from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function Header(): JSX.Element {
  const { data: session } = useSession();
  const displayUserName = session?.user ? (
    <h2>Hi, {session.user.name}</h2>
  ) : null;
  const header = (
    <h1>
      <Link href="/">
        <span>AI</span> Lengua{" "}
      </Link>
    </h1>
  );

  return (
    <header>
      {header}
      {displayUserName}
    </header>
  );
}
