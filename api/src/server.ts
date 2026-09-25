import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";

const server = createApp().listen(env.API_PORT, () => {
  logger.info(`API listening on port ${env.API_PORT}`);
});

// Let Docker stop the container cleanly: finish in-flight requests, then exit.
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => {
    logger.info(`${signal} received, shutting down`);
    server.close(() => process.exit(0));
  });
}
