import React, { useContext, createContext, useState } from "react";
import type { Session } from "next-auth";
type NextAuthContextType = {
  session: Session;
  isLoggedin: boolean;
};
const NextAuthContext = createContext<NextAuthContextType | undefined>(
  undefined
);
type NextAuthProviderProps = {
  children: JSX.Element | JSX.Element[];
  initialSession: Session;
};
export const NextAuthProvider = ({
  children,
  initialSession,
}: NextAuthProviderProps) => {
  const [session, setSession] = useState<Session>(initialSession);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  return (
    <NextAuthContext.Provider value={{ session, isLoggedin }}>
      {children}
    </NextAuthContext.Provider>
  );
};
export const useNextAuth = () => {
  const nextAuthContext = useContext(NextAuthContext);
  if (nextAuthContext === undefined) {
    throw Error("useNextAuth must be used within a NextAuthProvider");
  }
  return nextAuthContext;
};
