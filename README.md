# Monorepo starter

pnpm + Turborepo monorepo example starter with NestJS, React (Vite), shared Zod contracts, and shadcn/ui.

## Stack

- **apps/backend** — NestJS API with Zod-validated config, `nestjs-zod` DTOs, health + example hello modules
- **apps/frontend** — Vite + React + TanStack Router/Query + shadcn
- **packages/contracts** — shared Zod request/response schemas (`@repo/contracts`)
- **packages/eslint-config** / **packages/typescript-config** — shared tooling

## Prerequisites

- Node.js 24+ (see `.nvmrc`)
- [pnpm](https://pnpm.io) 10.20.0+

## Setup

```bash
pnpm install
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

## Develop

```bash
pnpm dev
```

Turbo builds `@repo/contracts` first, then starts:

- Backend: http://localhost:3000 (Swagger at `/docs`)
- Frontend: http://localhost:5173

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run all apps in watch mode |
| `pnpm build` | Build all packages and apps |
| `pnpm lint` | Lint all workspaces |
| `pnpm check-types` | Type-check all workspaces |
| `pnpm format:fix` | Format with Prettier |
