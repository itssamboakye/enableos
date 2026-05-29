"use client";

import { usePathname, useRouter } from "next/navigation";
import { HelpCircle, BookOpen, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import NotificationsDropdown from "./NotificationsDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Page context configuration
const pageContext: Record<string, { title: string; showActions: boolean }> = {
  "/dashboard": { title: "Dashboard", showActions: true },
  "/discovery-practice": { title: "Discovery Practice", showActions: false },
  "/sessions": { title: "Sessions", showActions: true },
  "/profile": { title: "Profile", showActions: true },
  "/help": { title: "Help & Support", showActions: true },
  "/feedback": { title: "Send Feedback", showActions: true },
  "/docs": { title: "Documentation", showActions: true },
  "/manager/overview": { title: "Team Overview", showActions: true },
  "/manager/reps": { title: "Rep Scoreboard", showActions: true },
  "/manager/team": { title: "Team Members", showActions: true },
  "/manager/sessions": { title: "Team Sessions", showActions: true },
  "/manager/coaching": { title: "Coaching Queue", showActions: true },
};

export default function TopHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const user = session?.user;
  
  // Get current page context
  const currentPage = Object.keys(pageContext).find((path) => 
    pathname === path || pathname.startsWith(path + "/")
  );
  const context = currentPage ? pageContext[currentPage] : { title: "", showActions: true };

  return (
    <TooltipProvider>
      <header className="z-50 flex h-14 sm:h-16 items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* Page Title */}
          {context.title && (
            <h1 className="text-lg font-medium text-foreground">{context.title}</h1>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Action Buttons - Only show on relevant pages */}
          {context.showActions && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 transition-colors duration-300 hover:bg-accent"
                    onClick={() => router.push("/help")}
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Help</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Help & Support</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 transition-colors duration-300 hover:bg-accent"
                    onClick={() => router.push("/feedback")}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="sr-only">Feedback</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Send Feedback</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 transition-colors duration-300 hover:bg-accent"
                    onClick={() => router.push("/docs")}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span className="sr-only">Docs</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Documentation</p>
                </TooltipContent>
              </Tooltip>

              {/* Notifications */}
              <NotificationsDropdown />
            </>
          )}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
              {user?.image ? (
                <>
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-full w-full rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                </>
              ) : (
                <>
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)
                      : "U"}
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.name || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </header>
    </TooltipProvider>
  );
}
