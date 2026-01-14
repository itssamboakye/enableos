# EnableOS EVI Integration - User Testing Guide

## Overview
This guide outlines the test scenarios for the EnableOS Discovery Practice feature using Hume's Empathic Voice Interface (EVI) with ATLAS, the Discovery Practice Coach.

## Pre-Test Checklist

- [ ] Environment variables are set (`HUME_API_KEY`, `HUME_SECRET_KEY`)
- [ ] Hume Configuration ID is correct: `088fdee8-4598-4522-81b5-686be1d74faf`
- [ ] Browser has microphone permissions enabled
- [ ] Browser supports WebSocket and Audio APIs (Chrome, Firefox, Safari, Edge)
- [ ] Development server is running (`pnpm dev`)

## Test Scenarios

### 1. Basic Navigation & Initialization

**Test 1.1: Page Load**
- Navigate to `/discovery-practice`
- Verify the scenario description is displayed
- Verify "Start Practice Session" button is visible
- Expected: Page loads correctly with scenario information

**Test 1.2: Start Call**
- Click "Start Practice Session" button
- Verify loading state appears ("Connecting to call...")
- Expected: Connection process initiates smoothly

### 2. EVI Connection & Audio

**Test 2.1: Access Token Retrieval**
- Start a session
- Check browser console/network tab
- Verify `/api/evi-token` endpoint returns successfully
- Expected: Access token is retrieved without errors

**Test 2.2: WebSocket Connection**
- Start a session
- Check browser console for connection logs
- Verify WebSocket connects to Hume EVI
- Expected: Connection establishes successfully

**Test 2.3: Microphone Access**
- Start a session
- Verify browser prompts for microphone permission (if not already granted)
- Grant permission
- Expected: Audio input stream is captured

**Test 2.4: Audio Output**
- Start a session
- Listen for ATLAS's voice response
- Expected: Audio plays through speakers/headphones

### 3. ATLAS Coach Behavior (Based on System Prompt)

**Test 3.1: Orientation Phase**
- Start a new session
- Listen for ATLAS's initial greeting
- Expected: ATLAS asks "Hey — I'm Atlas. What name should I call you?"
- Provide your name
- Expected: ATLAS acknowledges name and explains the session context

**Test 3.2: Session Flow**
- Follow the conversation flow
- Verify ATLAS explains:
  - "How This Works" phase
  - "Mini Discovery Primer" (Pain, Impact, Urgency)
  - "Discovery Type Selection" (Small Business, Mid-Market, Enterprise)
- Expected: ATLAS follows the prescribed session flow

**Test 3.3: Role Switch**
- Complete orientation and selection
- Listen for role switch announcement
- Expected: ATLAS says "Alright. I'll switch roles now. For the next few minutes, I'm the buyer."
- Expected: ATLAS begins acting as the buyer character

**Test 3.4: Buyer Mode Interaction**
- Engage in discovery conversation as the buyer
- Ask questions naturally
- Verify ATLAS responds as a realistic buyer
- Expected: Buyer responses are confident and realistic
- Expected: Problems are revealed gradually

### 4. Real-Time Audio Streaming

**Test 4.1: Audio Input Streaming**
- Speak during the call
- Verify your speech is captured and sent to EVI
- Check browser console for audio input logs (if debug enabled)
- Expected: Audio chunks are sent continuously (100ms intervals)

**Test 4.2: Audio Output Streaming**
- Listen to ATLAS's responses
- Verify audio plays smoothly without gaps
- Expected: Audio output is glitch-free and sequential

**Test 4.3: Conversation Flow**
- Have a natural back-and-forth conversation
- Verify interruptions are handled (if supported)
- Expected: Conversation flows naturally with proper turn-taking

### 5. Session Control

**Test 5.1: End Call**
- Click "End Call" button during an active session
- Verify call terminates gracefully
- Verify audio streams stop
- Verify WebSocket connection closes
- Expected: Clean disconnection with no errors

**Test 5.2: Restart Session**
- End a call
- Click "Start Practice Session" again
- Verify new session starts fresh
- Expected: New session initializes correctly

### 6. Error Handling

**Test 6.1: Network Error Simulation**
- Start a session
- Disconnect internet briefly
- Verify error handling
- Expected: Appropriate error message is displayed
- Expected: User can retry or close

**Test 6.2: Microphone Permission Denied**
- Revoke microphone permissions
- Start a session
- Expected: Clear error message about microphone access

**Test 6.3: Invalid Configuration**
- Test with incorrect config ID (if possible)
- Expected: Error is handled gracefully

### 7. UI/UX

**Test 7.1: Visual States**
- Verify all UI states display correctly:
  - Idle state
  - Connecting state (with spinner)
  - Connected state (with "Call in progress" indicator)
  - Error state
- Expected: UI states are clear and informative

**Test 7.2: Styling**
- Verify shadcn/ui components render correctly
- Verify responsive design on different screen sizes
- Expected: Consistent styling and layout

**Test 7.3: Accessibility**
- Test keyboard navigation
- Test screen reader compatibility (if applicable)
- Expected: Interface is accessible

### 8. Post-Call Feedback (If Implemented)

**Test 8.1: Automatic Feedback**
- Complete a discovery call
- Verify ATLAS provides automatic feedback
- Expected: Feedback includes:
  - Call Summary (2-3 bullets)
  - Discovery Scorecard (6 skills, X/10 each)
  - What You Did Well (3 bullets)
  - What to Improve (3 bullets with examples)
  - One Drill for Next Time
  - Closing question

**Test 8.2: Feedback Format**
- Verify feedback follows the specified format
- Expected: Feedback is structured and actionable

## Browser Compatibility Testing

Test in multiple browsers:
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Performance Testing

**Test P.1: Connection Time**
- Measure time from "Start" click to "Call in progress"
- Expected: Connection establishes within 2-5 seconds

**Test P.2: Audio Latency**
- Measure delay between speaking and ATLAS response
- Expected: Low latency (< 1-2 seconds for initial response)

**Test P.3: Memory Usage**
- Monitor browser memory during extended session
- Expected: No memory leaks over 10+ minute session

## Security Testing

**Test S.1: Access Token Security**
- Verify access tokens are not exposed in client-side code
- Verify tokens are retrieved server-side only
- Expected: No tokens in browser console/client code

**Test S.2: HTTPS/WSS**
- Verify WebSocket connections use WSS (secure)
- Expected: All connections are encrypted

## Known Limitations & Edge Cases

1. **Safari Audio Context**: Safari requires user gesture before initializing AudioContext
2. **Mobile Browsers**: EVI may have limited support on mobile browsers
3. **Network Conditions**: Poor network may cause connection issues
4. **Browser Permissions**: Microphone permissions must be granted

## Reporting Issues

When reporting issues, include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Browser console errors (if any)
- Network tab logs (if relevant)

## Success Criteria

A successful test session should demonstrate:
1. ✅ Seamless connection to EVI
2. ✅ Clear audio input/output
3. ✅ ATLAS follows the system prompt flow
4. ✅ Natural conversation interaction
5. ✅ Clean session termination
6. ✅ No critical errors or crashes
7. ✅ Good user experience and feedback
