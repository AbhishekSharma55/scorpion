# Changelog — Restructure Pass

This log captures the showcase-readiness pass on the repo. No business logic, frameworks or external behavior were changed.

## Structure

- Renamed `backend/` → `db/` (it only contained `init.sql`); updated `docker-compose.yml` mount path accordingly.
- Added `.env.example` at the root, mirroring `.env.dev` plus Postgres / pgAdmin variables.

## Frontend (Next.js)

- Replaced the create-next-app boilerplate landing page (`app/page.tsx`) with a real Scorpion-branded hero + feature grid + quickstart, linking to the existing `/docs` service dashboard.
- Updated `app/layout.tsx` metadata (`title` / `description`) so the browser tab and OG metadata reflect the project.
- Tweaked `globals.css` to use the Geist font variable as the default body font.
- Fixed the `/docs` service map: corrected the wrong URL for the maintenance app (was `:3000`, should be `:3002`), renamed the entry to "Maintenance Dashboard", and added a "Back home" link.

## Maintenance (React/CRA)

- Replaced the create-react-app spinning-logo boilerplate with a real admin dashboard that fetches live data from PostgREST: post statistics, recent active users, top-rated products. Uses `REACT_APP_API_URL` (defaults to `http://localhost:5000`).
- Added an in-page error banner when the API is unreachable, with a docker-compose hint.
- Replaced the boilerplate CSS with a dedicated dashboard stylesheet (`App.css`).
- Removed the unused CRA `logo.svg`.
- Updated `public/index.html` `<title>` and meta description.
- Updated `App.test.js` to reflect the new UI.

## Docker

- Fixed `frontend/Dockerfile` (production): the previous version ran `npm ci --production` and then `npm run build`, which fails because Next/Tailwind/TypeScript live in `devDependencies`. The build stage now installs full deps; the runtime stage copies only `.next`, `node_modules`, `package*.json`, `public/`, and `next.config.ts`. Exposes `3001` and runs `next start -p 3001`.
- Fixed `maintainance/Dockerfile` (production): the previous version used `CMD ["npm", "run", "build", "&&", "npm", "start"]` — exec form does not expand `&&`, so the container never started. New version is a multi-stage build that produces a static bundle and serves it via `serve`.

## Documentation

- Wrote a top-level `README.md` covering: tagline, what it does, tech stack, quickstart, sample API calls, ASCII architecture diagram, repo layout, dev workflow, known limitations.
- Added `DOCS/REPO_OVERVIEW.md` with the architectural snapshot and TODO list.
- Added this `DOCS/CHANGELOG.md`.
