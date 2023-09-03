import "@/styles-new/globals.scss";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { LanguageProvider } from "../context/language-context";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import Nav from "../components-new/nav/Nav";
import Header from "../components-new/header/Header";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <LanguageProvider initialLanguage={"English-US"}>
        <SessionProvider session={pageProps.session}>
          <div>
            <Header />
            <Nav />
          </div>
          <Component {...pageProps} />
        </SessionProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;
