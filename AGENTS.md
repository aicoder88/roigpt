# Repository Guidelines

## Project Structure & Module Organization
- App code: `src/app` (App Router: `layout.tsx`, `page.tsx`, `globals.css`).
- Components: `src/components` (UI primitives under `src/components/ui`).
- Contexts & utils: `src/contexts`, `src/lib`.
- Assets: `public/` (add images/fonts here). Favicon lives at `src/app/favicon.ico`.
- Tests: `tests/` with Playwright; config in `playwright.config.ts`.

## Build, Test, and Development Commands
- Install deps: `npm ci` (CI) or `npm install` (local).
- Start dev server: `npm run dev` (Next.js at `http://localhost:3000`).
- Build & run: `npm run build` then `npm start`.
- Install browsers: `npm run browsers:install` (Playwright browsers + deps).
- Run all tests: `npm test`.
- Run a file: `npm test -- tests/home-page.spec.ts`.
- View HTML report: `npm run report`.

## Coding Style & Naming Conventions
- Language: TypeScript + React (Next.js 14).
- Indentation: 2 spaces; semicolons required; prefer double quotes.
- Components: PascalCase filenames (e.g., `Header.tsx`).
- Tests: kebab-case with `.spec.ts` (e.g., `home-page.spec.ts`).
- Prefer accessible locators (`getByRole`, labels) and `data-testid` over brittle CSS.

## Testing Guidelines
- Framework: `@playwright/test` with Chromium/Firefox/WebKit.
- Server: tests auto-start the app per `playwright.config.ts`.
- Base URL: `BASE_URL` env overrides default `http://localhost:3000`.
- Keep tests deterministic; avoid arbitrary timeouts. Use Playwright assertions and auto-waits.
- Artifacts: HTML report at `playwright-report/` (via `npm run report`).

## Commit & Pull Request Guidelines
- Commits: Conventional style recommended — `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
- PRs: include summary, linked issues, test plan, and screenshots or report links for UI/test changes.
- CI readiness: no `test.only`; keep diffs focused; document any config changes (e.g., `playwright.config.ts`).

## Security & Configuration Tips
- Do not commit secrets; keep `.env*` out of VCS. Parameterize hosts via env (e.g., `BASE_URL`).
- Tests must not target production systems.
- Prefer config in `playwright.config.ts` over hardcoded URLs in specs.

