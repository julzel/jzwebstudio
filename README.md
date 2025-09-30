# jzwebstudio

A mobile-first React single page application scaffolded with Vite, TypeScript, Tailwind CSS, MUI, and react-icons. The project is fully tooled with linting, formatting, unit + e2e tests, and Git hooks for a smooth developer workflow.

## Prerequisites

- Node.js 18+
- Yarn 1 (classic)
- Recommended: `yarn playwright install` (first run only) to download browser binaries for e2e tests.

## Setup

```bash
yarn install
yarn playwright install # required once for Playwright browsers
```

## Commands

| Task                          | Command           |
| ----------------------------- | ----------------- |
| Start dev server              | `yarn dev`        |
| Type check + production build | `yarn build`      |
| Preview production build      | `yarn preview`    |
| Run unit tests                | `yarn test`       |
| Watch unit tests              | `yarn test:watch` |
| Generate coverage report      | `yarn coverage`   |
| Run e2e tests                 | `yarn e2e`        |
| Open Playwright UI mode       | `yarn e2e:ui`     |
| Lint code                     | `yarn lint`       |
| Format code                   | `yarn format`     |

Husky runs `lint-staged` on `git commit` to ensure files are linted and formatted.

## Folder Structure

```
.
├── index.html
├── package.json
├── playwright.config.ts
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vitest.config.ts
├── src
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── components
│   │   ├── Counter.test.tsx
│   │   ├── Counter.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── test-utils.tsx
│   └── theme.ts
└── tests
    └── e2e
        └── home.spec.ts
```

## Tailwind + MUI

- Tailwind utilities live in `src/index.css` and can be mixed with MUI components using the `className` prop.
- The custom MUI theme (`src/theme.ts`) aligns with Tailwind’s palette so utility classes and MUI styling remain consistent.
- `CssBaseline` is enabled in `src/main.tsx`, ensuring MUI applies sensible defaults while Tailwind handles utility styling.

## Testing

- Unit tests use Vitest with React Testing Library and include accessibility expectations (roles, visible text, interactive state).
- Coverage thresholds are enforced at 80% across statements, branches, functions, and lines.
- Playwright runs against the dev server (chromium, firefox, webkit) with base URL overrides via `PLAYWRIGHT_BASE_URL` or `APP_ENV`.

## Troubleshooting

- **Playwright browsers missing**: run `yarn playwright install`.
- **Port in use**: set `PLAYWRIGHT_BASE_URL` to an existing server or stop the conflicting process before `yarn dev`.
- **Lint errors on commit**: fix issues reported by ESLint/Prettier or run `yarn lint --fix` followed by `yarn format` manually.
- **Type check fails**: run `yarn build` locally to reproduce and review TypeScript diagnostics.
- **Slow installs (sandbox environments)**: set `HOME=$PWD` when running Yarn commands to keep cache directories writable.
