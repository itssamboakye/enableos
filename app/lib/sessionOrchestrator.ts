/**
 * Session Orchestrator for EnableOS Discovery Practice
 * Manages state transitions and prompt updates
 */

import {
  SessionState,
  SessionData,
  handleUserTurn,
  updateSessionState,
  createInitialSession,
  detectRoleConfusionIntent,
} from "./sessionStateMachine";
import { getSystemPromptForState } from "./sessionPrompts";

export interface OrchestratorCallbacks {
  onPromptUpdate: (prompt: string) => void;
  onStateChange?: (state: SessionState) => void;
}

export class SessionOrchestrator {
  private session: SessionData;
  private callbacks: OrchestratorCallbacks;

  constructor(callbacks: OrchestratorCallbacks) {
    this.session = createInitialSession();
    this.callbacks = callbacks;
    // Initialize with first prompt
    this.updatePrompt();
  }

  /**
   * Get current session data
   */
  getSession(): SessionData {
    return { ...this.session };
  }

  /**
   * Handle a user message - process and transition state if needed
   */
  handleUserMessage(userText: string): {
    shouldSendToLLM: boolean;
    responseOverride?: string;
  } {
    // Handle role confusion first
    if (detectRoleConfusionIntent(userText)) {
      if (this.session.state === SessionState.BUYER_RESPONDING) {
        return {
          shouldSendToLLM: true,
          // The prompt will handle this, but we could override here if needed
        };
      }
    }

    // Process state transition
    const transition = handleUserTurn(this.session, userText);

    // Update session state
    const previousState = this.session.state;
    this.session = updateSessionState(this.session, transition, userText);

    // Add user message to transcript
    this.session.transcript.push({
      role: "user",
      text: userText,
      timestamp: Date.now(),
    });

    // Update prompt if state changed
    if (transition.shouldUpdatePrompt || previousState !== this.session.state) {
      this.updatePrompt();
      if (this.callbacks.onStateChange) {
        this.callbacks.onStateChange(this.session.state);
      }
    }

    return {
      shouldSendToLLM: true,
    };
  }

  /**
   * Handle an assistant message - track in transcript
   */
  handleAssistantMessage(assistantText: string): void {
    this.session.transcript.push({
      role: "assistant",
      text: assistantText,
      timestamp: Date.now(),
    });

    // Check if buyer opening was just delivered
    if (
      this.session.state === SessionState.BUYER_OPENING &&
      !this.session.buyerOpeningDelivered &&
      assistantText.includes("I'm happy to answer questions")
    ) {
      this.session.buyerOpeningDelivered = true;
      // Transition to BUYER_RESPONDING
      this.session.state = SessionState.BUYER_RESPONDING;
      this.updatePrompt();
      if (this.callbacks.onStateChange) {
        this.callbacks.onStateChange(this.session.state);
      }
    }
  }

  /**
   * Update the prompt based on current state
   */
  private updatePrompt(): void {
    const prompt = getSystemPromptForState(this.session.state, {
      name: this.session.name,
      buyerContext: this.session.buyerContext,
      callType: this.session.callType,
      isAborted: this.session.isAborted,
    });

    console.log(`[ORCHESTRATOR] Updating prompt for state: ${this.session.state}`);
    this.callbacks.onPromptUpdate(prompt);
  }

  /**
   * Force transition to feedback state (e.g., on end call)
   */
  forceFeedbackState(): void {
    if (this.session.state !== SessionState.COACH_FEEDBACK) {
      this.session.state = SessionState.COACH_FEEDBACK;
      this.updatePrompt();
      if (this.callbacks.onStateChange) {
        this.callbacks.onStateChange(this.session.state);
      }
    }
  }

  /**
   * Get transcript for feedback generation
   */
  getTranscript(): SessionData["transcript"] {
    return [...this.session.transcript];
  }

  /**
   * Reset session
   */
  reset(): void {
    this.session = createInitialSession();
    this.updatePrompt();
  }
}
