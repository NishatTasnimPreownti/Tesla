import pino from "pino";
import { env } from "../config/env";

export const logger = pino({
  level: env.NODE_ENV === "test" ? "silent" : env.LOG_LEVEL,
  // Human-readable logs locally; plain JSON everywhere else so log tools can parse them.
  transport: env.NODE_ENV === "development" ? { target: "pino-pretty" } : undefined,
  redact: ["req.headers.authorization", "req.headers.cookie", 'res.headers["set-cookie"]'],
});
