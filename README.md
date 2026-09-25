# Dhaka Tesla Pool

Share a seat. Split the fare. Survive Dhaka traffic.

A ride-pooling MVP where passengers (Nusrat, Rafiq, Shirin) can share a three-seat electric "Tesla" (Jashim's *Bullet*), each paying their own fair fare.

> 🚧 Work in progress — features, API overview and demo will be added as they land.

## Design

- [Architecture & ride lifecycle](docs/architecture.drawio)
- [Database ERD](docs/erd.drawio)

Open the `.drawio` files at [app.diagrams.net](https://app.diagrams.net) (Open Existing Diagram → Device) or with the draw.io desktop app.

## Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js (App Router, TypeScript, Tailwind CSS) |
| Backend | Node.js 22 + Express 5 (TypeScript), zod, pino |
| Database | PostgreSQL 16 |
| Tests | Vitest + Supertest |
| Local run | Docker Compose |

## Project structure

```
.
├── api/                 Express REST API
│   ├── src/
│   │   ├── config/      environment validation
│   │   ├── lib/         logger, error types
│   │   ├── middleware/  request logging, error handling
│   │   ├── routes/      HTTP routes
│   │   ├── app.ts       builds the Express app (used by tests)
│   │   └── server.ts    starts the HTTP server
│   └── tests/
├── web/                 Next.js frontend (proxies /api/* to the API)
├── docs/                architecture, lifecycle and ERD diagrams
├── docker-compose.yml
└── .env.example
```

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for the one-command setup)
- Node.js 22+ and npm (only for running without Docker)

## Quick start (Docker)

```bash
cp .env.example .env        # optional: compose has safe local defaults
docker compose up --build
```

| Service | URL |
|---|---|
| Web | http://localhost:3000 |
| API | http://localhost:4000 (health: `/health`) |
| PostgreSQL | localhost:5432 |

All three services have health checks; `web` waits for `api`, and `api` waits for `db`.
Stop with `docker compose down` (add `-v` to also delete the database volume).

## Running without Docker

```bash
# terminal 1 — API on :4000
cd api
npm install
npm run dev

# terminal 2 — web on :3000 (proxies /api/* to http://localhost:4000)
cd web
npm install
npm run dev
```

## Tests

```bash
cd api
npm test
```

## Environment variables

See [.env.example](.env.example). Never commit a real `.env`.

| Variable | Used by | Purpose |
|---|---|---|
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | db, api | Database credentials |
| `DATABASE_URL` | api | Connection string |
| `API_PORT` | api | Port the API listens on (default 4000) |
| `LOG_LEVEL` | api | pino log level (default `info`) |
| `JWT_SECRET` / `JWT_EXPIRES_IN` | api | Auth token signing (used from the auth feature onwards) |
| `API_URL` | web | Where Next.js forwards `/api/*` (build time) |
