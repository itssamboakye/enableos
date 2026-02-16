/**
 * Helper functions for creating notifications
 */

export type NotificationType = "session_complete" | "feedback_ready" | "system" | "achievement";

export interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
}

/**
 * Create a notification for a user
 * This is a non-blocking operation - failures are logged but don't throw
 * Note: This function should be called from server-side code (API routes)
 */
export async function createNotification(params: CreateNotificationParams): Promise<void> {
  try {
    // Direct database insert for server-side calls
    const { query } = await import("@/lib/db");
    const notificationId = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await query(
      `INSERT INTO notifications (id, "userId", type, title, message, link, read, "createdAt")
       VALUES ($1, $2, $3, $4, $5, $6, FALSE, NOW())`,
      [notificationId, params.userId, params.type, params.title, params.message, params.link || null]
    );
  } catch (error) {
    console.error("Error creating notification:", error);
    // Don't throw - notifications are non-critical
  }
}
