"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Collapse on small screens to keep the main content usable.
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1023px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(max-width: 1023px)");
    const onChange = (e: MediaQueryListEvent) => setIsCollapsed(e.matches);

    // Support older browsers.
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    // eslint-disable-next-line deprecation/deprecation
    // @ts-expect-error - older Safari uses addListener/removeListener
    mql.addListener(onChange);
    // @ts-expect-error - older Safari uses addListener/removeListener
    return () => mql.removeListener(onChange);
  }, []);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const collapseSidebar = () => setIsCollapsed(true);
  const expandSidebar = () => setIsCollapsed(false);

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, toggleSidebar, collapseSidebar, expandSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
