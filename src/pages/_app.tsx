import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { LanguageProvider } from "../context/language-context";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import { Header } from "@/components/header";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <LanguageProvider initialLanguage={"English-US"}>
        <SessionProvider session={pageProps.session}>
          <Header />
          <Component {...pageProps} />
        </SessionProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;
