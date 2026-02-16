import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";
import { sendAccountUpdateEmail } from "@/lib/emails/senders";

/**
 * GET /api/user/profile - Get current user profile
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Include role in response
    const userWithRole = await queryOne<{ role: string | null }>(
      `SELECT role FROM users WHERE id = $1`,
      [user.id]
    );

    return NextResponse.json({
      ...user,
      role: userWithRole?.role || "user",
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user/profile - Update user profile
 */
export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { preferredName, title, company } = body;

    // Build update query dynamically
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (preferredName !== undefined) {
      updates.push(`"preferredName" = $${paramIndex}`);
      values.push(preferredName || null);
      paramIndex++;
    }

    if (title !== undefined) {
      updates.push(`title = $${paramIndex}`);
      values.push(title || null);
      paramIndex++;
    }

    if (company !== undefined) {
      updates.push(`company = $${paramIndex}`);
      values.push(company || null);
      paramIndex++;
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    values.push(user.id);

    await query(
      `UPDATE users 
       SET ${updates.join(", ")}, "updatedAt" = NOW() 
       WHERE id = $${paramIndex}`,
      values
    );

    // Fetch updated user
    const updatedUser = await query(
      `SELECT id, email, name, "preferredName", image, title, company 
       FROM users 
       WHERE id = $1`,
      [user.id]
    );

    // Send account update email (non-blocking)
    try {
      const userData = await queryOne<{
        email: string;
        name: string | null;
        preferredName: string | null;
      }>(
        `SELECT email, name, "preferredName" FROM users WHERE id = $1`,
        [user.id]
      );

      if (userData?.email) {
        const userName = userData.preferredName || userData.name?.split(" ")[0] || "there";
        
        sendAccountUpdateEmail(user.id, userData.email, {
          userName,
          updateType: "profileUpdate",
        }).catch((err) => {
          console.error("Failed to send account update email:", err);
        });
      }
    } catch (emailError) {
      console.error("Error preparing account update email:", emailError);
    }

    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
