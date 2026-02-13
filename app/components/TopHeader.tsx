"use client";

import { usePathname } from "next/navigation";
import { Bell, HelpCircle, BookOpen, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
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
  "/discovery-practice": { title: "Practice Session", showActions: false },
  "/sessions": { title: "Sessions", showActions: true },
  "/profile": { title: "Profile", showActions: true },
};

export default function TopHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const user = session?.user;
  
  // Get current page context
  const currentPage = Object.keys(pageContext).find((path) => 
    pathname === path || pathname.startsWith(path + "/")
  );
  const context = currentPage ? pageContext[currentPage] : { title: "", showActions: true };

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 relative transition-colors duration-300 hover:bg-accent"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Notifications</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="h-full w-full rounded-full"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </div>
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
