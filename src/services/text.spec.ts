import { describe, expect, it } from "vitest";
import { evaluateAnswer } from "./text";

describe("evaluateAnswer", () => {
  it("marks exact answer as correct", () => {
    const result = evaluateAnswer("Knowledge is power.", "Knowledge is power");
    expect(result.level).toBe("correct");
    expect(result.similarity).toBe(1);
  });

  it("returns close for near misses", () => {
    const result = evaluateAnswer("Knowledge are power", "Knowledge is power");
    expect(["close", "wrong"]).toContain(result.level);
    expect(result.similarity).toBeLessThan(1);
  });
});
