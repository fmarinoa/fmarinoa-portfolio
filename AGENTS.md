# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page personal portfolio (Franco Mariño) built with Astro, TypeScript and Tailwind CSS v4, deployed to Vercel with SSR (`output: 'server'`, `@astrojs/vercel` adapter).

## Commands

Package manager is **pnpm** (repo uses `pnpm-lock.yaml`; CI pins pnpm v9, Node 22).

```bash
pnpm dev              # astro dev --host
pnpm build            # astro build
pnpm preview           # astro preview
pnpm lint             # eslint .
pnpm lint:fix
pnpm prettier:check
pnpm prettier         # prettier --write .
pnpm test             # vitest (watch)
pnpm test:run         # vitest run (single run, used in CI)
pnpm test:coverage    # vitest run --coverage (80% threshold on lines/branches/functions/statements)
```

Run a single test file: `pnpm vitest run src/helpers/__tests__/stringsUtils.test.ts`

Docker (mirrors the same dev server on port 4321): `pnpm docker:up` / `pnpm docker:down`.

## Architecture

### Content is external to this repo

There is **no local content/data directory**. All portfolio copy (projects, jobs, careers, courses, footer links, about-me markdown, CV URL) is fetched at request time as JSON/Markdown from `CONTENT_BASE_URL` (env var, see `.env.example` — typically a `raw.githubusercontent.com` URL pointing at a separate `content` branch/repo).

- `src/index.ts` re-exports `CONTENT_BASE_URL` from `import.meta.env`.
- `src/lib/content.ts` defines the fetch endpoints (`/data/*.json`, `/data/aboutMe.md`) and asset path helpers (`getIconUrl`, `getPhotoUrl`), and exposes `fetchData` with a safe fallback if the fetch fails (never throws — logs a warning and returns the fallback).
- `src/services/getCvUrl.ts` fetches `/data/urls.json` for the CV link specifically, with its own validation/error-message contract (`CvUrlResponse`).
- `src/actions/index.ts` wraps `getCvUrl` in an Astro Action (`actions.getCvUrl`) so the client can request the CV URL via a server action instead of exposing `CONTENT_BASE_URL` to the browser; errors become `ActionError`.
- When adding a new content type, follow the existing pattern: add an endpoint to `endpoints` in `content.ts`, add a fetcher function, add the corresponding type to `src/types/index.ts`.

### Page structure

Single route: `src/pages/index.astro` composes `Layout` + ordered sections (`AboutMe`, `Experience`, `Projects`, `Education`) from `src/sections/`. Sections are server-rendered Astro components that call the `src/lib/content.ts` fetchers and render `src/components/*` (`Section`, `Carousel`, `InfoCard`, `Alert`, `CvModal`, `BackToTop`, `Navbar`, `Footer`).

Client-side interactivity (e.g. `CvModal.astro`) uses plain inline `<script>` blocks with vanilla DOM APIs and `astro:actions` — there is no client framework/hydration.

### Path alias

`@/*` maps to `src/*` (configured in both `tsconfig.json` and `vitest.config.ts`).

### Testing

Vitest with `environment: 'node'`. Tests live in `__tests__` folders next to the code they cover (e.g. `src/helpers/__tests__/stringsUtils.test.ts`). Coverage excludes `src/index.ts`, types, and config files, and enforces an 80% threshold across the board — keep new logic in `src/helpers`, `src/lib`, `src/services` covered.

### Branch layout (relevant when working with CI/deploys)

This repo's GitHub Actions (`.github/workflows/ci.yaml`, `cd.yaml`) reference multiple long-lived branches beyond `master`/`develop`:

- `content` — the external content data consumed via `CONTENT_BASE_URL`.
- `test` — holds Playwright end-to-end tests, run against the freshly deployed Vercel preview URL in the `execute-test` CI job (separate from the Vitest unit tests in this branch's `src/`).

Vercel auto-deployment is disabled for `master`, `content`, `development`, and `test` branches in `vercel.json`; deploys happen explicitly through the CI/CD workflows instead.

### Commits

Conventional Commits enforced via commitlint + husky (`commit-msg` hook). `pre-commit` runs lint-staged (eslint --fix + prettier on staged files); `pre-push` runs `test:run` then `lint`. Commit messages must be in English, `<type>(<scope>): <description>`, max ~50 chars.

### Style

ESLint uses `neostandard` (style rules disabled — Prettier owns formatting) plus `eslint-plugin-astro` for `.astro` files. Prettier config: no semicolons, single quotes, no arrow-function parens for single args (`arrowParens: avoid`), 80 col width.
