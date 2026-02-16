"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { UserContext } from "@/lib/sessionOrchestrator";

interface ExtendedUserContext extends UserContext {
  role?: "user" | "admin";
}

const UserContextContext = createContext<ExtendedUserContext | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [userRole, setUserRole] = useState<"user" | "admin" | undefined>(undefined);

  useEffect(() => {
    if (session?.user?.email) {
      // Fetch user role
      fetch("/api/user/profile")
        .then((res) => res.json())
        .then((data) => {
          setUserRole(data.role || "user");
        })
        .catch(() => {
          setUserRole("user");
        });
    }
  }, [session?.user?.email]);
  
  const userContext: ExtendedUserContext | null = session?.user
    ? {
        name: session.user.name || null,
        preferredName: (session.user as any).preferredName || null,
        email: session.user.email || undefined,
        role: userRole,
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
