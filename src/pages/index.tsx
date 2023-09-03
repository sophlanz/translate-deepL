import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import router from "next/router";

export default function Home() {
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session]);
  return <div></div>;
}
