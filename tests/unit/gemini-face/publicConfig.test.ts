import { afterEach, describe, expect, it } from "vitest";
import {
  GEMINI_FACE_WS_PATH,
  getGeminiFacePublicConfig,
} from "../../../app/lib/gemini-face/publicConfig";

describe("getGeminiFacePublicConfig", () => {
  const env = process.env;

  afterEach(() => {
    process.env = { ...env };
  });

  it("uses external ws URL when GEMINI_FACE_WS_URL is set", () => {
    process.env.GEMINI_FACE_WS_URL = "wss://face.example.com/api/gemini-face/ws";
    delete process.env.GEMINI_API_KEY;

    const config = getGeminiFacePublicConfig();
    expect(config.enabled).toBe(true);
    expect(config.wsUrl).toBe("wss://face.example.com/api/gemini-face/ws");
    expect(config.wsPath).toBeNull();
  });

  it("falls back to same-origin path when only GEMINI_API_KEY is set", () => {
    delete process.env.GEMINI_FACE_WS_URL;
    process.env.GEMINI_API_KEY = "test-key";

    const config = getGeminiFacePublicConfig();
    expect(config.enabled).toBe(true);
    expect(config.wsUrl).toBeNull();
    expect(config.wsPath).toBe(GEMINI_FACE_WS_PATH);
  });

  it("is disabled when neither URL nor API key is configured", () => {
    delete process.env.GEMINI_FACE_WS_URL;
    delete process.env.GEMINI_API_KEY;

    const config = getGeminiFacePublicConfig();
    expect(config.enabled).toBe(false);
    expect(config.wsUrl).toBeNull();
    expect(config.wsPath).toBeNull();
  });
});
