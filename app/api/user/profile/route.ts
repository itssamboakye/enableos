import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";
import { sendAccountUpdateEmail } from "@/lib/emails/senders";

/**
 * GET /api/user/profile - Get current user profile.
 * If the user has a pending company invite (e.g. manager invite), we apply it here
 * so that already-logged-in users who open the invite link get the correct role
 * without having to sign out and sign in again.
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

    const email = user.email?.toLowerCase();
    if (email) {
      const invite = await queryOne<{ companyId: string; role: string }>(
        `SELECT "companyId", role FROM company_invites
         WHERE email = $1 AND "acceptedAt" IS NULL
         ORDER BY "createdAt" DESC LIMIT 1`,
        [email]
      );
      if (invite?.companyId) {
        const roleToSet = invite.role === "manager" || invite.role === "user" ? invite.role : "user";
        await query(
          `UPDATE users SET "companyId" = $1, role = $2, "updatedAt" = NOW() WHERE email = $3`,
          [invite.companyId, roleToSet, email]
        );
        await query(
          `UPDATE company_invites SET "acceptedAt" = NOW() WHERE email = $1 AND "companyId" = $2 AND "acceptedAt" IS NULL`,
          [email, invite.companyId]
        );
      }
    }

    const fresh = await queryOne<{ id: string; email: string; name: string | null; preferredName: string | null; image: string | null; title: string | null; company: string | null; companyId: string | null; role: string | null }>(
      `SELECT id, email, name, "preferredName", image, title, company, "companyId", role FROM users WHERE id = $1`,
      [user.id]
    );

    if (!fresh) {
      return NextResponse.json({ ...user, role: "user" });
    }

    return NextResponse.json({
      id: fresh.id,
      email: fresh.email,
      name: fresh.name,
      preferredName: fresh.preferredName,
      image: fresh.image,
      title: fresh.title,
      company: fresh.company,
      companyId: fresh.companyId,
      role: fresh.role || "user",
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
