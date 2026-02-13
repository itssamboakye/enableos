"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  MessageSquare, 
  User,
  LogOut,
  Search,
  Phone,
  Presentation,
  CheckCircle,
  Mail,
  Handshake,
  Clock,
  History,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import { useSidebar } from "./SidebarContext";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Practice Discovery",
    href: "/discovery-practice",
    icon: Search,
  },
  {
    name: "Practice Prospecting",
    href: "#",
    icon: Phone,
    disabled: true,
  },
  {
    name: "Practice Demo",
    href: "#",
    icon: Presentation,
    disabled: true,
  },
  {
    name: "Practice Qualification",
    href: "#",
    icon: CheckCircle,
    disabled: true,
  },
  {
    name: "Practice Follow Up",
    href: "#",
    icon: Mail,
    disabled: true,
  },
  {
    name: "Practice Closing",
    href: "#",
    icon: Handshake,
    disabled: true,
  },
];

interface Session {
  id: string;
  createdAt: string;
  duration: number | null;
  callType: string | null;
}

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sessions?limit=10")
      .then((res) => res.json())
      .then((data) => {
        if (data.sessions) {
          setSessions(data.sessions);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMins = Math.floor(diffTime / (1000 * 60));
        return diffMins < 1 ? "Just now" : `${diffMins}m ago`;
      }
      return `${diffHours}h ago`;
    }
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    return `${mins}m`;
  };

  const groupSessionsByDate = (sessions: Session[]) => {
    const groups: { [key: string]: Session[] } = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    sessions.forEach((session) => {
      const sessionDate = new Date(session.createdAt);
      sessionDate.setHours(0, 0, 0, 0);
      const diffTime = today.getTime() - sessionDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let groupKey: string;
      if (diffDays === 0) groupKey = "Today";
      else if (diffDays === 1) groupKey = "Yesterday";
      else if (diffDays < 7) groupKey = "Previous 7 days";
      else groupKey = "Older";

      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(session);
    });

    return groups;
  };

  const groupedSessions = groupSessionsByDate(sessions);

  if (isCollapsed) {
    return (
      <div className="flex h-screen w-16 flex-col border-r border-border bg-secondary/20 items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-9 w-9"
          title="Open sidebar"
        >
          <PanelLeftOpen className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-secondary/20 transition-all duration-300">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center justify-between border-b border-border px-6">
        <h1 className="text-xl font-medium text-foreground">EnableOS</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
            title="Close sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          const isDisabled = item.disabled;
          
          return (
            <Link
              key={item.name}
              href={isDisabled ? "#" : item.href}
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault();
                }
              }}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isDisabled && "opacity-50 cursor-not-allowed",
                isActive && !isDisabled
                  ? "bg-accent text-accent-foreground"
                  : !isDisabled && "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}

        {/* Sessions Section */}
        <div className="pt-6 mt-6">
          <div className="px-3 mb-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Recent Sessions
            </h3>
          </div>
          
          {loading ? (
            <div className="px-3 py-2 text-xs text-muted-foreground">Loading...</div>
          ) : sessions.length === 0 ? (
            <div className="px-3 py-2 text-xs text-muted-foreground">
              No sessions yet
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedSessions).map(([groupKey, groupSessions]) => (
                <div key={groupKey}>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-3">
                    {groupKey}
                  </h4>
                  <div className="space-y-1">
                    {groupSessions.map((session) => {
                      const isActive = pathname?.includes(`session=${session.id}`);
                      return (
                        <Link
                          key={session.id}
                          href={`/discovery-practice/summary?session=${session.id}`}
                          className={cn(
                            "group flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors duration-300",
                            "hover:bg-accent/50 hover:text-accent-foreground",
                            isActive && "bg-accent text-accent-foreground"
                          )}
                        >
                          <MessageSquare className="h-3 w-3 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="truncate font-medium">
                              {session.callType || "Discovery"}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {session.duration && (
                                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-2.5 w-2.5" />
                                  {formatDuration(session.duration)}
                                </span>
                              )}
                              <span className="text-[10px] text-muted-foreground">
                                {formatDate(session.createdAt)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Sign Out */}
      <div className="border-t border-border p-4">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
