import express from "express";
import { healthRouter } from "./routes/health.routes";

// The app is built separately from server.ts so tests can use it without opening a port.
export function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/health", healthRouter);

  return app;
}
