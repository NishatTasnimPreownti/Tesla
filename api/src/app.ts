import express from "express";
import helmet from "helmet";
import { errorHandler, notFound } from "./middleware/error-handler";
import { requestLogger } from "./middleware/request-logger";
import { healthRouter } from "./routes/health.routes";

// The app is built separately from server.ts so tests can use it without opening a port.
export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(requestLogger);
  app.use(express.json({ limit: "100kb" }));

  app.use("/health", healthRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
