import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";

/**
 * GET /api/notifications - Get current user's notifications
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const unreadOnly = searchParams.get("unreadOnly") === "true";

    let notificationsQuery = `
      SELECT id, type, title, message, link, read, "createdAt"
      FROM notifications
      WHERE "userId" = $1
    `;

    const params: any[] = [user.id];

    if (unreadOnly) {
      notificationsQuery += ` AND read = FALSE`;
    }

    notificationsQuery += ` ORDER BY "createdAt" DESC LIMIT $${params.length + 1}`;
    params.push(limit);

    const notifications = await query<{
      id: string;
      type: string;
      title: string;
      message: string;
      link: string | null;
      read: boolean;
      createdAt: string;
    }>(notificationsQuery, params);

    // Get unread count
    const unreadCountResult = await queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM notifications WHERE "userId" = $1 AND read = FALSE`,
      [user.id]
    );

    return NextResponse.json({
      notifications: notifications.map((n) => ({
        id: n.id,
        type: n.type,
        title: n.title,
        message: n.message,
        link: n.link,
        read: n.read,
        timestamp: n.createdAt,
      })),
      unreadCount: parseInt(unreadCountResult?.count || "0"),
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/notifications - Create a new notification
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, title, message, link } = body;

    if (!type || !title || !message) {
      return NextResponse.json(
        { error: "Type, title, and message are required" },
        { status: 400 }
      );
    }

    const validTypes = ["session_complete", "feedback_ready", "system", "achievement"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid notification type" },
        { status: 400 }
      );
    }

    const notificationId = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await query(
      `INSERT INTO notifications (id, "userId", type, title, message, link, read, "createdAt")
       VALUES ($1, $2, $3, $4, $5, $6, FALSE, NOW())`,
      [notificationId, user.id, type, title, message, link || null]
    );

    return NextResponse.json({ success: true, id: notificationId });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}
