# Track 1 evaluation — [date]

**Evaluator:**  
**Model used:**  
**Session modes tested:** video+audio / video-only  

## Session results

| Metric | Target | Result |
|--------|--------|--------|
| Longest stable session | ≥15 min | |
| Reconnect count | logged | |
| Median update staleness | ≤3s | |
| Parse success rate | ≥95% | |
| Est. cost / 10 min | documented | |
| Face-absent behavior | low conf / faceDetected false | |

## Comparison

| Baseline | Notes |
|----------|-------|
| Hume face overlay (1 FPS) | |
| EVI prosody (per utterance) | |

## Recommendation

- [ ] **GO** — integrate into EnableOS
- [ ] **GO (video-only)** — face overlay only for v1
- [ ] **NO-GO** — proceed to Track 2 polling

**Notes for Track 2 comparison:**

**Log files attached:**

- `logs/session-....jsonl`
- `logs/session-....csv`
