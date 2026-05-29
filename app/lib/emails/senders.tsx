import { render } from "@react-email/render";
import { resend, FROM_EMAIL, REPLY_TO_EMAIL, BASE_URL } from "./config";
import { canSendEmail, generateUnsubscribeToken, getUnsubscribeUrl } from "./utils";
import { SessionCompletionEmail } from "./templates/session-completion";
import { WelcomeEmail } from "./templates/welcome";
import { PracticeReminderEmail } from "./templates/practice-reminder";
import { MilestoneEmail } from "./templates/milestone";
import { FeedbackReadyEmail } from "./templates/feedback-ready";
import { SessionExportEmail } from "./templates/session-export";
import { AccountUpdateEmail } from "./templates/account-update";
import { TeamInviteEmail } from "./templates/team-invite";
import { ManagerInviteEmail } from "./templates/manager-invite";
import { ManagerDigestEmail } from "./templates/manager-digest";
import type {
  SessionCompletionEmailData,
  WelcomeEmailData,
  PracticeReminderEmailData,
  MilestoneEmailData,
  FeedbackReadyEmailData,
  SessionExportEmailData,
  AccountUpdateEmailData,
  TeamInviteEmailData,
  ManagerInviteEmailData,
  ManagerDigestEmailData,
} from "./types";

/**
 * Send session completion email
 */
export async function sendSessionCompletionEmail(
  userId: string,
  userEmail: string,
  data: SessionCompletionEmailData
): Promise<boolean> {
  if (!resend) {
    console.warn("[EMAIL] Resend not configured (RESEND_API_KEY not set), skipping session completion email");
    return false;
  }

  if (!(await canSendEmail(userId, "sessionCompletion"))) {
    console.log(`[EMAIL] User ${userId} has opted out of session completion emails`);
    return false;
  }
  
  console.log(`[EMAIL] Sending session completion email to ${userEmail} for session ${data.sessionId}`);

  try {
    const unsubscribeToken = await generateUnsubscribeToken(
      userId,
      "sessionCompletion"
    );
    const unsubscribeUrl = getUnsubscribeUrl(unsubscribeToken, "sessionCompletion");

    const html = await render(
      <SessionCompletionEmail
        userName={data.userName}
        sessionId={data.sessionId}
        sessionDate={data.sessionDate}
        duration={data.duration}
        buyerContext={data.buyerContext}
        buyerRole={data.buyerRole}
        callType={data.callType}
        scores={data.scores}
        feedbackHighlights={data.feedbackHighlights}
        feedbackUrl={`${BASE_URL}/discovery-practice/summary?session=${data.sessionId}`}
        unsubscribeUrl={unsubscribeUrl}
      />
    );

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      replyTo: REPLY_TO_EMAIL,
      subject: `Practice Session Complete - ${new Date(data.sessionDate).toLocaleDateString()}`,
      html,
    });

    console.log(`[EMAIL] Session completion email sent successfully. Resend ID: ${result.data?.id || 'unknown'}`);
    return true;
  } catch (error) {
    console.error("[EMAIL] Error sending session completion email:", error);
    return false;
  }
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(
  userId: string,
  data: WelcomeEmailData
): Promise<boolean> {
  if (!resend) {
    console.warn("Resend not configured, skipping email");
    return false;
  }

  if (!(await canSendEmail(userId, "welcome"))) {
    console.log(`User ${userId} has opted out of welcome emails`);
    return false;
  }

  try {
    const unsubscribeToken = await generateUnsubscribeToken(userId, "welcome");
    const unsubscribeUrl = getUnsubscribeUrl(unsubscribeToken, "welcome");

    const html = await render(<WelcomeEmail {...data} unsubscribeUrl={unsubscribeUrl} />);

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.userEmail,
      replyTo: REPLY_TO_EMAIL,
      subject: "Welcome to EnableOS!",
      html,
    });

    return true;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return false;
  }
}

/**
 * Send practice reminder email
 */
export async function sendPracticeReminderEmail(
  userId: string,
  userEmail: string,
  data: PracticeReminderEmailData
): Promise<boolean> {
  if (!resend) {
    console.warn("Resend not configured, skipping email");
    return false;
  }

  if (!(await canSendEmail(userId, "practiceReminder"))) {
    return false;
  }

  try {
    const unsubscribeToken = await generateUnsubscribeToken(
      userId,
      "practiceReminder"
    );
    const unsubscribeUrl = getUnsubscribeUrl(unsubscribeToken, "practiceReminder");

    const html = await render(
      <PracticeReminderEmail {...data} unsubscribeUrl={unsubscribeUrl} />
    );

    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      replyTo: REPLY_TO_EMAIL,
      subject: "Time to Practice - EnableOS",
      html,
    });

    return true;
  } catch (error) {
    console.error("Error sending practice reminder email:", error);
    return false;
  }
}

/**
 * Send milestone achievement email
 */
export async function sendMilestoneEmail(
  userId: string,
  userEmail: string,
  data: MilestoneEmailData
): Promise<boolean> {
  if (!resend) {
    console.warn("Resend not configured, skipping email");
    return false;
  }

  if (!(await canSendEmail(userId, "milestone"))) {
    return false;
  }

  try {
    const unsubscribeToken = await generateUnsubscribeToken(userId, "milestone");
    const unsubscribeUrl = getUnsubscribeUrl(unsubscribeToken, "milestone");

    const html = await render(<MilestoneEmail {...data} unsubscribeUrl={unsubscribeUrl} />);

    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      replyTo: REPLY_TO_EMAIL,
      subject: `🎉 Milestone Achieved: ${data.milestone} - EnableOS`,
      html,
    });

    return true;
  } catch (error) {
    console.error("Error sending milestone email:", error);
    return false;
  }
}

/**
 * Send feedback ready notification
 */
export async function sendFeedbackReadyEmail(
  userId: string,
  userEmail: string,
  data: FeedbackReadyEmailData
): Promise<boolean> {
  if (!resend) {
    console.warn("Resend not configured, skipping email");
    return false;
  }

  if (!(await canSendEmail(userId, "feedbackReady"))) {
    return false;
  }

  try {
    const unsubscribeToken = await generateUnsubscribeToken(
      userId,
      "feedbackReady"
    );
    const unsubscribeUrl = getUnsubscribeUrl(unsubscribeToken, "feedbackReady");

    const html = await render(
      <FeedbackReadyEmail
        {...data}
        feedbackUrl={`${BASE_URL}/discovery-practice/summary?session=${data.sessionId}`}
        unsubscribeUrl={unsubscribeUrl}
      />
    );

    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      replyTo: REPLY_TO_EMAIL,
      subject: `Your Feedback is Ready - ${new Date(data.sessionDate).toLocaleDateString()}`,
      html,
    });

    return true;
  } catch (error) {
    console.error("Error sending feedback ready email:", error);
    return false;
  }
}

/**
 * Send session export email
 */
export async function sendSessionExportEmail(
  userId: string,
  userEmail: string,
  data: SessionExportEmailData
): Promise<boolean> {
  if (!resend) {
    console.warn("Resend not configured, skipping email");
    return false;
  }

  if (!(await canSendEmail(userId, "sessionExport"))) {
    return false;
  }

  try {
    const unsubscribeToken = await generateUnsubscribeToken(
      userId,
      "sessionExport"
    );
    const unsubscribeUrl = getUnsubscribeUrl(unsubscribeToken, "sessionExport");

    const html = await render(
      <SessionExportEmail
        {...data}
        exportUrl={data.exportUrl || `${BASE_URL}/discovery-practice/summary?session=${data.sessionId}`}
        unsubscribeUrl={unsubscribeUrl}
      />
    );

    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      replyTo: REPLY_TO_EMAIL,
      subject: `Session Export - ${new Date(data.sessionDate).toLocaleDateString()}`,
      html,
    });

    return true;
  } catch (error) {
    console.error("Error sending session export email:", error);
    return false;
  }
}

/**
 * Send account update email
 */
export async function sendAccountUpdateEmail(
  userId: string,
  userEmail: string,
  data: AccountUpdateEmailData
): Promise<boolean> {
  if (!resend) {
    console.warn("Resend not configured, skipping email");
    return false;
  }

  if (!(await canSendEmail(userId, "accountUpdate"))) {
    return false;
  }

  try {
    const unsubscribeToken = await generateUnsubscribeToken(
      userId,
      "accountUpdate"
    );
    const unsubscribeUrl = getUnsubscribeUrl(unsubscribeToken, "accountUpdate");

    const html = await render(
      <AccountUpdateEmail {...data} unsubscribeUrl={unsubscribeUrl} />
    );

    const subjectMap = {
      emailVerification: "Verify Your Email - EnableOS",
      profileUpdate: "Profile Updated - EnableOS",
      passwordChange: "Password Changed - EnableOS",
    };

    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      replyTo: REPLY_TO_EMAIL,
      subject: subjectMap[data.updateType] || "Account Update - EnableOS",
      html,
    });

    return true;
  } catch (error) {
    console.error("Error sending account update email:", error);
    return false;
  }
}

/**
 * Send team invite email (manager invites rep to company)
 * No unsubscribe — one-off transactional invite.
 */
export async function sendTeamInviteEmail(
  data: TeamInviteEmailData
): Promise<boolean> {
  if (!resend) {
    console.warn("Resend not configured, skipping team invite email");
    return false;
  }

  try {
    const html = await render(<TeamInviteEmail {...data} />);

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.inviteeEmail,
      replyTo: REPLY_TO_EMAIL,
      subject: `You're invited to ${data.companyName} on EnableOS`,
      html,
    });

    return true;
  } catch (error) {
    console.error("Error sending team invite email:", error);
    return false;
  }
}

/**
 * Send manager invite email (admin invites manager to a company)
 */
export async function sendManagerInviteEmail(
  data: ManagerInviteEmailData
): Promise<boolean> {
  if (!resend) {
    console.warn("Resend not configured, skipping manager invite email");
    return false;
  }

  try {
    const html = await render(<ManagerInviteEmail {...data} />);

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.inviteeEmail,
      replyTo: REPLY_TO_EMAIL,
      subject: `You're invited to manage ${data.companyName} on EnableOS`,
      html,
    });

    return true;
  } catch (error) {
    console.error("Error sending manager invite email:", error);
    return false;
  }
}

/**
 * Send manager team digest email (weekly summary for managers).
 */
export async function sendManagerDigestEmail(
  managerEmail: string,
  data: ManagerDigestEmailData
): Promise<boolean> {
  if (!resend) {
    console.warn("Resend not configured, skipping manager digest email");
    return false;
  }

  try {
    const html = await render(<ManagerDigestEmail {...data} />);

    await resend.emails.send({
      from: FROM_EMAIL,
      to: managerEmail,
      replyTo: REPLY_TO_EMAIL,
      subject: `Team digest — ${data.companyName} (${data.periodLabel})`,
      html,
    });

    return true;
  } catch (error) {
    console.error("Error sending manager digest email:", error);
    return false;
  }
}
