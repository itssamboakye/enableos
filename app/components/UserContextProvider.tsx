"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, ReactNode } from "react";
import { UserContext } from "@/lib/sessionOrchestrator";

const UserContextContext = createContext<UserContext | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  
  const userContext: UserContext | null = session?.user
    ? {
        name: session.user.name || null,
        preferredName: (session.user as any).preferredName || null,
        email: session.user.email || undefined,
      }
    : null;

  return (
    <UserContextContext.Provider value={userContext}>
      {children}
    </UserContextContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContextContext);
}
