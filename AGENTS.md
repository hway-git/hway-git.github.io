# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Nuxt 3 frontend source (pages, components, composables, stores, utils, and SCSS assets).
- `server/`: Nitro server routes, APIs, and server plugins (for feeds, stats, and path/date fixes).
- `content/`: Markdown content for blog posts and previews, organized by year (for example `content/posts/2025/`).
- `public/`: Static assets such as fonts.
- `scripts/`: Local automation scripts (currently `new-blog.js` for creating posts).
- `patches/`: `pnpm` patch files applied via `patchedDependencies`.

## Build, Test, and Development Commands
- `pnpm dev`: Start local dev server (`nuxt dev --no-qr`).
- `pnpm build`: Production build (`nuxt build`).
- `pnpm generate`: Generate static output.
- `pnpm preview`: Preview the built site locally.
- `pnpm lint`: Run ESLint across the repo.
- `pnpm lint:fix`: Auto-fix lintable issues.
- `pnpm new`: Create a new blog post scaffold via `scripts/new-blog.js`.

## Coding Style & Naming Conventions
- Language stack: TypeScript + Vue SFCs + SCSS.
- ESLint is based on `@antfu/eslint-config`; use 4-space indentation in code.
- JSON/YAML use 2-space indentation.
- Vue blocks should use `lang="ts"`/`lang="tsx"` for scripts and `lang="scss"` for styles.
- Follow existing naming patterns:
  - Components: `PascalCase.vue` (for example `PostHeader.vue`).
  - Composables: `useXxx.ts` (for example `usePagination.ts`).
  - Content files: lowercase kebab-case with date/topic context.

## Testing Guidelines
- No dedicated automated test framework is currently configured.
- Before opening a PR, run: `pnpm lint && pnpm build`.
- For content or UI changes, also run `pnpm dev` and verify affected pages manually.

## Commit & Pull Request Guidelines
- Match existing commit style seen in history: concise prefixes such as `feat(scope): ...`, `fix(scope): ...`, `post: ...`, or `Update ...`.
- Keep commits focused on one logical change.
- PRs should include:
  - Clear summary and motivation.
  - Linked issue (if applicable).
  - Screenshots/GIFs for UI changes.
  - Notes on validation performed (`lint`, build, and manual checks).
