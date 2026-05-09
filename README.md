# Scorpion

A Dockerized full-stack starter built around **PostgREST** — one `docker compose up` and you have a relational database, an auto-generated REST API, a cache, two web UIs, OpenAPI docs and a database admin tool, all wired together.

## What this project does

- Spins up a complete local development environment with **one command**.
- Exposes a relational PostgreSQL schema (users, posts, comments, tags, products) as a REST API automatically via [PostgREST](https://postgrest.org/).
- Ships seed data (50 users, 100 posts, 200 comments, 100 products) so the API has something to talk to from the first request.
- Includes a **Next.js 16** frontend showcasing the stack and a **React** maintenance dashboard that talks to the API.
- Provides Swagger UI, pgAdmin and Redis out of the box.

## Tech stack

| Layer            | Tech                                       |
| ---------------- | ------------------------------------------ |
| Database         | PostgreSQL 16 (alpine)                     |
| API              | PostgREST (auto-generated REST + OpenAPI)  |
| Cache            | Redis 7 (LRU, AOF persistence)             |
| Frontend         | Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript |
| Maintenance UI   | React 19 (CRA)                             |
| API docs         | Swagger UI                                 |
| DB admin         | pgAdmin 4                                  |
| Orchestration    | Docker Compose                             |

## Quickstart

### Prerequisites

- Docker 20.10+
- Docker Compose v2

### Run it

```bash
git clone <repo-url>
cd scorpion
docker compose up --build
```

First build takes ~5 minutes. Subsequent runs are seconds.

### Open it

| Service          | URL                          | Notes                            |
| ---------------- | ---------------------------- | -------------------------------- |
| Frontend         | http://localhost:3001        | Next.js landing + service map    |
| Maintenance      | http://localhost:3002        | React admin dashboard            |
| PostgREST API    | http://localhost:5000        | `/users`, `/posts`, `/rpc/...`   |
| Swagger UI       | http://localhost:8080        | Live OpenAPI docs                |
| pgAdmin          | http://localhost:5050        | `admin@example.com` / `admin`    |
| PostgreSQL       | `localhost:5436`             | `app_user` / `password`          |
| Redis            | `localhost:6379`             | LRU 256 MB                       |

The frontend includes a live service dashboard at <http://localhost:3001/docs>.

## Try the API

```bash
# List users
curl http://localhost:5000/users?limit=5

# Search posts (RPC)
curl "http://localhost:5000/rpc/search_posts?keyword=Docker"

# Aggregate post statistics (RPC)
curl http://localhost:5000/rpc/post_stats

# Filter products by category and price
curl "http://localhost:5000/products?category=eq.Electronics&price=lt.100&order=rating.desc"
```

PostgREST exposes everything in the `api` schema: tables, views (`posts_with_authors`, `popular_posts`, `active_users_stats`, `products_by_category`) and RPC functions (`search_posts`, `post_stats`, `increment_view_count`, `get_user_posts`, `search_products`).

## Architecture

```
┌──────────────────┐    ┌──────────────────┐
│  Next.js (3001)  │    │ Maintenance (3002)│
│   /  /docs       │    │  React admin UI   │
└────────┬─────────┘    └─────────┬────────┘
         │                        │
         │      HTTP / JSON       │
         └────────────┬───────────┘
                      ▼
         ┌────────────────────────┐
         │   PostgREST  (5000)    │ ◀── Swagger UI (8080)
         └────────────┬───────────┘
                      │ SQL
                      ▼
         ┌────────────────────────┐         ┌──────────────┐
         │  PostgreSQL  (5436)    │ ◀────── │ pgAdmin (5050)│
         │    schema: api         │         └──────────────┘
         └────────────────────────┘

         ┌────────────────────────┐
         │   Redis  (6379)        │ ◀── shared cache
         └────────────────────────┘
```

All services run on a shared `app-network` Docker bridge. The database init script lives in [`db/init.sql`](db/init.sql).

## Repository layout

```
scorpion/
├── frontend/         # Next.js 16 app (port 3001)
│   ├── app/          # App-Router pages (page.tsx, docs/page.tsx)
│   ├── Dockerfile    # Production image (multi-stage)
│   └── Dockerfile.dev
├── maintainance/     # React (CRA) admin app (port 3002)
│   ├── src/
│   ├── Dockerfile    # Production image (static + serve)
│   └── Dockerfile.dev
├── db/
│   └── init.sql      # Schema, seed data, views, RPCs, roles
├── docs/
│   ├── REPO_OVERVIEW.md
│   ├── CHANGELOG.md
│   └── installation-guide.md
├── docker-compose.yml
├── .env.example
└── README.md
```

## Development workflow

```bash
# Tail logs for one service
docker compose logs -f frontend

# Restart one service
docker compose restart server

# Stop everything (preserves volumes)
docker compose down

# Wipe volumes for a clean DB
docker compose down -v
```

For the full installation walkthrough see [`docs/installation-guide.md`](docs/installation-guide.md).

## Known limitations

- The `db/init.sql` seed grants public read on the `api` schema via the `web_anon` role — fine for a starter, **do not deploy as-is**.
- pgAdmin and PostgREST credentials in `docker-compose.yml` are placeholders. Override via `.env` before any non-local use.
- The maintenance app is CRA-based; consider migrating to Vite if extending it.
