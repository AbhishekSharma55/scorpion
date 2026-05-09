# Repository Overview

## What this project is

Scorpion is a self-contained, Dockerized full-stack starter. It demonstrates how to wire **PostgreSQL → PostgREST → JS frontend** without writing a custom backend: PostgREST reads the database schema and serves a typed REST API automatically. Everything else (Redis, Swagger, pgAdmin, two web UIs) is plumbed together via `docker-compose`.

It is meant as a portfolio / interview-ready showcase rather than a production deployment.

## Tech stack

- **PostgreSQL 16** — relational store with seeded `api` schema
- **PostgREST** — auto-generated REST API, OpenAPI spec
- **Redis 7** — cache, LRU + AOF
- **Next.js 16 + React 19 + Tailwind 4** — primary frontend
- **React 19 (CRA)** — separate maintenance / admin app
- **Swagger UI** — live API documentation
- **pgAdmin 4** — DB admin UI
- **Docker Compose** — single-command orchestration

## Main directories

| Path             | Responsibility                                                |
| ---------------- | ------------------------------------------------------------- |
| `frontend/`      | Next.js 16 UI on port 3001. App-Router; pages `/` and `/docs`.|
| `maintainance/`  | CRA-based React admin dashboard on port 3002.                 |
| `db/`            | PostgreSQL init script (schema, seed data, views, RPCs).     |
| `docs/`          | Human-facing installation guide.                              |
| `DOCS/`          | Internal repo docs (this file, changelog).                    |

The `db/` folder is mounted into Postgres at `/docker-entrypoint-initdb.d/init.sql` — it runs once when the database volume is created.

## How to run it

```bash
docker compose up --build
```

Open <http://localhost:3001> for the landing page and <http://localhost:3001/docs> for the live service dashboard.

To start cleanly:

```bash
docker compose down -v && docker compose up --build
```

## Service map

| Service        | Image / build context        | Port (host:container) |
| -------------- | ---------------------------- | --------------------- |
| `db`           | `postgres:16-alpine`         | `5436:5432`           |
| `server`       | `postgrest/postgrest`        | `5000:3000`           |
| `redis`        | `redis:7-alpine`             | `6379:6379`           |
| `swagger`      | `swaggerapi/swagger-ui`      | `8080:8080`           |
| `pgadmin`      | `dpage/pgadmin4`             | `5050:80`             |
| `frontend`     | `./frontend`                 | `3001:3001`           |
| `maintainance` | `./maintainance`             | `3002:3000`           |

## Database schema highlights

- **Tables**: `users`, `posts`, `comments`, `tags`, `post_tags`, `products`
- **Views**: `posts_with_authors`, `popular_posts`, `active_users_stats`, `products_by_category`
- **RPCs**: `search_posts`, `post_stats`, `increment_view_count`, `get_user_posts`, `search_products`
- **Role**: `web_anon` for unauthenticated reads via PostgREST

## Known issues / TODOs

- Hardcoded credentials in `docker-compose.yml`. Wire them through `.env` for any non-trivial use.
- The maintenance app is CRA-based — `react-scripts` is in maintenance mode. A Vite migration would shrink the dev image and dependency surface.
- No automated tests beyond the placeholder CRA test. Adding a smoke test that asserts PostgREST returns seeded data would be valuable.
- `Dockerfile` (prod) builds for both apps still rely on the Node base image at runtime; switching to `distroless` or Next.js standalone output would reduce image size.
- No CI configured. A simple GitHub Actions workflow (`docker compose build`, `docker compose up -d`, curl the API) would catch regressions cheaply.
