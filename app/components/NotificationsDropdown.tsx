"use client";

import { useState } from "react";
import { Bell, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  type: "session_complete" | "feedback_ready" | "system" | "achievement";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

// Mock notifications - in a real app, these would come from an API
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "session_complete",
    title: "Practice Session Complete",
    message: "Your discovery practice session is ready for review",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    link: "/sessions",
  },
  {
    id: "2",
    type: "feedback_ready",
    title: "Feedback Available",
    message: "Detailed feedback is now available for your recent session",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    link: "/sessions",
  },
  {
    id: "3",
    type: "achievement",
    title: "Milestone Reached",
    message: "You've completed 10 practice sessions! Keep up the great work.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
];

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "session_complete":
        return "🎯";
      case "feedback_ready":
        return "📊";
      case "achievement":
        return "🏆";
      default:
        return "ℹ️";
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative transition-colors duration-300 hover:bg-accent"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="px-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-2 py-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 px-3 py-3 cursor-pointer",
                  !notification.read && "bg-accent/50"
                )}
                onClick={() => {
                  if (!notification.read) {
                    markAsRead(notification.id);
                  }
                  if (notification.link) {
                    window.location.href = notification.link;
                  }
                }}
              >
                <span className="text-lg flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </DropdownMenuItem>
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5">
              <button
                onClick={() => {
                  // In a real app, this would navigate to a full notifications page
                  setIsOpen(false);
                }}
                className="text-xs text-primary hover:underline w-full text-left"
              >
                View all notifications
              </button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
