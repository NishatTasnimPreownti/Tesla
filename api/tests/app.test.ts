import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";

const app = createApp();

describe("GET /health", () => {
  it("reports the API is up", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("returns a request id header", async () => {
    const res = await request(app).get("/health");

    expect(res.headers["x-request-id"]).toBeTruthy();
  });

  it("reuses the caller's request id when provided", async () => {
    const res = await request(app).get("/health").set("X-Request-Id", "nusrat-trace-1");

    expect(res.headers["x-request-id"]).toBe("nusrat-trace-1");
  });
});

describe("error handling", () => {
  it("returns 404 in the standard error shape for unknown routes", async () => {
    const res = await request(app).get("/rides/does-not-exist-yet");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: { code: "NOT_FOUND", message: "Route GET /rides/does-not-exist-yet not found" },
    });
  });

  it("returns 400 INVALID_JSON for a malformed body", async () => {
    const res = await request(app)
      .post("/health")
      .set("Content-Type", "application/json")
      .send("{not json");

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("INVALID_JSON");
  });
});
