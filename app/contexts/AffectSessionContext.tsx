"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { buildAffectSummary } from "@/lib/affect/buildAffectSummary";
import { FaceAffectAggregator } from "@/lib/affect/faceAffectAggregator";
import type { AffectSummary, TranscriptEntryForAffect } from "@/lib/affect/types";

interface AffectSessionContextValue {
  recordFaceSample: (
    primary: string | null | undefined,
    pills: Array<{ name: string; score: number }>,
    faceDetected: boolean
  ) => void;
  buildSummary: (transcript: TranscriptEntryForAffect[]) => AffectSummary | null;
  reset: () => void;
}

const AffectSessionContext = createContext<AffectSessionContextValue | null>(null);

export function AffectSessionProvider({ children }: { children: ReactNode }) {
  const aggregatorRef = useRef(new FaceAffectAggregator());

  const recordFaceSample = useCallback(
    (
      primary: string | null | undefined,
      pills: Array<{ name: string; score: number }>,
      faceDetected: boolean
    ) => {
      aggregatorRef.current.record(primary, pills, faceDetected);
    },
    []
  );

  const buildSummary = useCallback((transcript: TranscriptEntryForAffect[]) => {
    return buildAffectSummary(aggregatorRef.current, transcript);
  }, []);

  const reset = useCallback(() => {
    aggregatorRef.current.reset();
  }, []);

  const value = useMemo(
    () => ({ recordFaceSample, buildSummary, reset }),
    [recordFaceSample, buildSummary, reset]
  );

  return (
    <AffectSessionContext.Provider value={value}>{children}</AffectSessionContext.Provider>
  );
}

export function useAffectSession() {
  const ctx = useContext(AffectSessionContext);
  if (!ctx) {
    throw new Error("useAffectSession must be used within AffectSessionProvider");
  }
  return ctx;
}

/** Optional hook for components that may render outside the practice session. */
export function useAffectSessionOptional() {
  return useContext(AffectSessionContext);
}
