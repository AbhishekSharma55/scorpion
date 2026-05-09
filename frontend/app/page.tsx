import Link from "next/link";
import {
  ArrowRight,
  Database,
  Zap,
  FileText,
  Wrench,
  Server,
  Layers,
} from "lucide-react";

const features = [
  {
    icon: <Database className="w-5 h-5" />,
    title: "PostgreSQL + PostgREST",
    description:
      "An auto-generated REST API on top of a relational schema with views and RPCs.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Redis cache",
    description: "LRU-bounded Redis instance ready for sessions and caching.",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Next.js 16 frontend",
    description: "Modern App Router UI on port 3001 with Tailwind v4.",
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Maintenance dashboard",
    description: "A separate React admin app on port 3002.",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Swagger UI",
    description:
      "Auto-generated OpenAPI docs for the PostgREST API on port 8080.",
  },
  {
    icon: <Server className="w-5 h-5" />,
    title: "pgAdmin",
    description:
      "Browser-based PostgreSQL admin on port 5050 — no local install needed.",
  },
];

const stack = [
  "PostgreSQL 16",
  "PostgREST",
  "Redis 7",
  "Next.js 16",
  "React 19",
  "Tailwind CSS 4",
  "Docker Compose",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          All services running locally
        </div>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Scorpion
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          A Dockerized full-stack starter built around{" "}
          <span className="font-semibold text-white">PostgREST</span>. One
          command spins up a Postgres database, an auto-generated REST API,
          Redis, Swagger, pgAdmin, a Next.js frontend, and a React admin
          dashboard.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
          >
            Open services dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="http://localhost:8080"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-slate-500"
          >
            API docs (Swagger)
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-300"
            >
              {s}
            </span>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="text-2xl font-bold">What's inside</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-slate-700 bg-slate-900/60 p-5 transition-colors hover:border-slate-500"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-800 text-blue-400">
                  {f.icon}
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-lg border border-slate-700 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-bold">Quickstart</h2>
          <p className="mt-2 text-sm text-slate-400">
            From the repository root:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-md bg-black/60 p-4 font-mono text-sm text-slate-200">
            <code>{`docker compose up --build`}</code>
          </pre>
          <p className="mt-4 text-sm text-slate-400">
            Then open{" "}
            <Link href="/docs" className="text-blue-400 hover:underline">
              /docs
            </Link>{" "}
            for the live service map.
          </p>
        </section>

        <footer className="mt-20 text-center text-xs text-slate-500">
          Built with Next.js, PostgREST and Docker Compose.
        </footer>
      </div>
    </main>
  );
}
