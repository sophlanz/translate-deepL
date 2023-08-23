import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { LanguageProvider } from "./context/language-context";
import NextAuth from "next-auth/next";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LanguageProvider initialLanguage={"English-US"}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </LanguageProvider>
  );
};

export default App;
