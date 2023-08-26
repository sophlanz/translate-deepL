import React, { useEffect } from "react";
import { Header } from "../components/header";
import { WordOfDayContainer } from "../components/wordOfDay";
import { TranslateWrapper } from "../components/translate";
import { WritingWrapper } from "../components/write";
import { useSession } from "next-auth/react";
import router from "next/router";

export default function Home() {
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session]);
  return (
    <div className="homepage">
      <Header />
      <WordOfDayContainer />
      <TranslateWrapper />
      <WritingWrapper />
    </div>
  );
}
