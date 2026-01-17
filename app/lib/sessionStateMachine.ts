/**
 * State Machine for EnableOS Discovery Practice Session
 * Controls flow - the LLM does NOT control transitions
 */

export enum SessionState {
  COACH_INTRO = "COACH_INTRO",
  COACH_CONTEXT = "COACH_CONTEXT",
  COACH_CALL_TYPE = "COACH_CALL_TYPE",
  BUYER_OPENING = "BUYER_OPENING",
  BUYER_RESPONDING = "BUYER_RESPONDING",
  COACH_ABORT = "COACH_ABORT",
  COACH_FEEDBACK = "COACH_FEEDBACK",
}

export interface SessionData {
  state: SessionState;
  name?: string;
  buyerContext?: string;
  callType?: "Small Business" | "Mid-Market" | "Enterprise";
  transcript: Array<{
    role: "user" | "assistant";
    text: string;
    timestamp: number;
  }>;
  isAborted?: boolean;
  buyerOpeningDelivered?: boolean;
}

export interface StateTransition {
  newState: SessionState;
  shouldUpdatePrompt: boolean;
}

/**
 * Detects end-call/abort intents in user text
 */
export function detectEndCallIntent(text: string): boolean {
  const normalized = text.toLowerCase().trim();
  const patterns = [
    /end call/i,
    /end the call/i,
    /can we end the call/i,
    /let's end the call/i,
    /let's end/i,
    /can we end/i,
    /let me end/i,
    /i want to end/i,
    /i'm done/i,
    /i am done/i,
    /goodbye/i,
    /that's all/i,
    /that is all/i,
  ];
  return patterns.some((pattern) => pattern.test(normalized));
}

/**
 * Detects abort/nervous intents (different from end-call - wants to pause, not fully end)
 */
export function detectAbortIntent(text: string): boolean {
  const normalized = text.toLowerCase().trim();
  const patterns = [
    /^stop$/i,
    /^pause$/i,
    /i'm nervous/i,
    /can we pause/i,
    /let's pause/i,
    /can we stop/i,
    /i need a break/i,
    /^okay pause/i,
  ];
  return patterns.some((pattern) => pattern.test(normalized));
}

/**
 * Detects role confusion intents
 */
export function detectRoleConfusionIntent(text: string): boolean {
  const normalized = text.toLowerCase().trim();
  const patterns = [
    /are you the buyer/i,
    /are you the seller/i,
    /why are you asking/i,
    /who am i/i,
    /who are you/i,
    /what's my role/i,
    /you sound like the seller/i,
    /you sound like the buyer/i,
    /you're acting like/i,
    /i'm supposed to be/i,
  ];
  return patterns.some((pattern) => pattern.test(normalized));
}

/**
 * Detects if user wants feedback
 */
export function detectFeedbackIntent(text: string): boolean {
  const normalized = text.toLowerCase().trim();
  const patterns = [
    /feedback/i,
    /give me feedback/i,
    /i want feedback/i,
    /can i have feedback/i,
    /show feedback/i,
  ];
  return patterns.some((pattern) => pattern.test(normalized));
}

/**
 * Detects if user wants to come back later
 */
export function detectLaterIntent(text: string): boolean {
  const normalized = text.toLowerCase().trim();
  const patterns = [
    /later/i,
    /come back/i,
    /next time/i,
    /not now/i,
    /maybe later/i,
  ];
  return patterns.some((pattern) => pattern.test(normalized));
}

/**
 * Main state transition function
 * Returns the new state and whether prompt should be updated
 */
export function handleUserTurn(
  session: SessionData,
  userText: string
): StateTransition {
  const normalizedText = userText.trim();

  switch (session.state) {
    case SessionState.COACH_INTRO:
      // Any response means we captured the name
      if (normalizedText.length > 0) {
        return {
          newState: SessionState.COACH_CONTEXT,
          shouldUpdatePrompt: true,
        };
      }
      return { newState: session.state, shouldUpdatePrompt: false };

    case SessionState.COACH_CONTEXT:
      // Any response means we captured buyer context
      if (normalizedText.length > 0) {
        return {
          newState: SessionState.COACH_CALL_TYPE,
          shouldUpdatePrompt: true,
        };
      }
      return { newState: session.state, shouldUpdatePrompt: false };

    case SessionState.COACH_CALL_TYPE:
      // Detect call type from response
      const callTypeMatch = normalizedText.match(
        /(small business|mid.?market|enterprise)/i
      );
      if (callTypeMatch || normalizedText.length > 0) {
        return {
          newState: SessionState.BUYER_OPENING,
          shouldUpdatePrompt: true,
        };
      }
      return { newState: session.state, shouldUpdatePrompt: false };

    case SessionState.BUYER_OPENING:
      // This state waits for the assistant to deliver the opening
      // Once delivered, transition happens externally via markBuyerOpeningDelivered
      return { newState: session.state, shouldUpdatePrompt: false };

    case SessionState.BUYER_RESPONDING:
      // Check for end-call intents FIRST (before abort - end call goes straight to feedback)
      if (detectEndCallIntent(normalizedText)) {
        return {
          newState: SessionState.COACH_FEEDBACK,
          shouldUpdatePrompt: true,
        };
      }
      // Check for abort intents (pause/nervous - goes to abort first)
      if (detectAbortIntent(normalizedText)) {
        return {
          newState: SessionState.COACH_ABORT,
          shouldUpdatePrompt: true,
        };
      }
      // Otherwise stay in BUYER_RESPONDING
      return { newState: session.state, shouldUpdatePrompt: false };

    case SessionState.COACH_ABORT:
      // User chose feedback or later
      if (detectFeedbackIntent(normalizedText)) {
        return {
          newState: SessionState.COACH_FEEDBACK,
          shouldUpdatePrompt: true,
        };
      }
      // If later, we'll handle ending the session externally
      // But transition to feedback for now (can be truncated)
      return {
        newState: SessionState.COACH_FEEDBACK,
        shouldUpdatePrompt: true,
      };

    case SessionState.COACH_FEEDBACK:
      // Feedback state is terminal - no transitions
      return { newState: session.state, shouldUpdatePrompt: false };

    default:
      return { newState: session.state, shouldUpdatePrompt: false };
  }
}

/**
 * Creates initial session state
 */
export function createInitialSession(): SessionData {
  return {
    state: SessionState.COACH_INTRO,
    transcript: [],
  };
}

/**
 * Updates session with new data from state transition
 */
export function updateSessionState(
  session: SessionData,
  transition: StateTransition,
  userText?: string
): SessionData {
  const newSession = {
    ...session,
    state: transition.newState,
  };

  // Extract and store data based on current state
  if (userText) {
    const normalizedText = userText.trim();
    
    if (session.state === SessionState.COACH_INTRO && normalizedText.length > 0) {
      newSession.name = normalizedText;
    } else if (
      session.state === SessionState.COACH_CONTEXT &&
      normalizedText.length > 0
    ) {
      newSession.buyerContext = normalizedText;
    } else if (
      session.state === SessionState.COACH_CALL_TYPE &&
      normalizedText.length > 0
    ) {
      const callTypeMatch = normalizedText.match(
        /(small business|mid.?market|enterprise)/i
      );
      if (callTypeMatch) {
        const matched = callTypeMatch[1].toLowerCase();
        if (matched.includes("small")) {
          newSession.callType = "Small Business";
        } else if (matched.includes("mid") || matched.includes("market")) {
          newSession.callType = "Mid-Market";
        } else if (matched.includes("enterprise")) {
          newSession.callType = "Enterprise";
        }
      }
    }

    // Mark as aborted if transitioning to COACH_ABORT
    if (transition.newState === SessionState.COACH_ABORT) {
      newSession.isAborted = true;
    }
  }

  return newSession;
}
