// An expected, client-facing failure (bad input, not allowed, pool full, ...).
// Anything that is not an AppError is treated as a bug and returned as a generic 500.
export class AppError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}
