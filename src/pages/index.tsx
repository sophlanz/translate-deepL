import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import router from "next/router";
import { WordOfDay } from "@/components/wordOfDay";
import { Translate } from "@/components/translate";
import { Write } from "@/components/write";
export default function Home() {
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session]);
  return (
    <main className="mainContainer">
      <WordOfDay />
      <Translate />
      <Write />
    </main>
  );
}
