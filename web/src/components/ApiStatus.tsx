"use client";

import { useEffect, useState } from "react";

type Status = { state: "loading" } | { state: "up"; uptime: number } | { state: "down" };

// Small end-to-end check: browser → Next.js (/api proxy) → Express /health.
export function ApiStatus() {
  const [status, setStatus] = useState<Status>({ state: "loading" });

  useEffect(() => {
    fetch("/api/health", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((body: { uptime: number }) => setStatus({ state: "up", uptime: body.uptime }))
      .catch(() => setStatus({ state: "down" }));
  }, []);

  const label = {
    loading: "Checking API…",
    up: "API is up",
    down: "API is unreachable",
  }[status.state];

  const dot = {
    loading: "bg-neutral-400",
    up: "bg-green-500",
    down: "bg-red-500",
  }[status.state];

  return (
    <p className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400" role="status">
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} aria-hidden />
      {label}
    </p>
  );
}
