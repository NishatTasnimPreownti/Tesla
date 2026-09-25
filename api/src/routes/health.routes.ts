import { Router } from "express";

export const healthRouter = Router();

// Liveness check used by Docker Compose and the hosting platform.
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", uptime: Math.round(process.uptime()) });
});
