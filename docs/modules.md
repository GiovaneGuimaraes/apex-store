# APEX Store — Modules Documentation

## Overview

**APEX** is a premium sneaker & streetwear store built as a full-stack TypeScript monorepo managed with **pnpm workspaces**. The repository is split into three independent modules that communicate through a well-defined contract:

```
loja-mocked/
├── app/          ← React 18 + Vite + TypeScript + Tailwind CSS
├── database/     ← Sequelize ORM (PostgreSQL) — TypeScript, compiled to dist/
├── api/          ← Express REST API — TypeScript, compiled to dist/
├── docs/         ← This documentation
├── package.json  ← Root workspace scripts
└── pnpm-workspace.yaml
```

> **Language:** All three modules are written in **TypeScript 5**. The `database/` and `api/` modules compile to CommonJS via `tsc`. The `app/` module compiles via Vite.
>
> **Package manager:** `pnpm` with workspaces. Run `pnpm i` at the root to install all dependencies. The `api/` package depends on `apex-store-database` via `workspace:*`.
>
> **Build order:** `database/` must be built before `api/` since the API imports from `apex-store-database` (linked via pnpm workspaces). Use `pnpm build:db && pnpm build:api` or `pnpm build` at the root.
>
> **TypeScript project references:** `api/tsconfig.json` references `../database` so that `tsc -b` resolves the dependency graph automatically.

---

## Module 1 — `app/` (Frontend)

### Purpose
Cinematic landing page and full storefront SPA. Consumes the REST API for all data.

### Tech Stack
| Package | Version | Why |
|---|---|---|
| `react` + `react-dom` | ^18 | Concurrent rendering, Suspense |
| `vite` | ^5 | Sub-second HMR, fast build |
| `typescript` | ^5 | End-to-end type safety |
| `tailwindcss` | ^3 | Utility-first, co-located design |
| `framer-motion` | ^11 | Production-quality animations |
| `lucide-react` | ^0.400 | Lightweight, tree-shakeable icons |
| `react-router-dom` | ^6 | Client-side routing |
| `@tanstack/react-query` | ^5 | Server state, cache, background refresh |
| `zustand` | ^4 | Lightweight client state (cart, auth) |
| `axios` | ^1 | HTTP client with interceptors |

### Directory Structure
```
packages/app/
├── src/
│   ├── components/
│   │   ├── ui/            ← Shared animation primitives
│   │   │   ├── WordsPullUp.tsx
│   │   │   ├── WordsPullUpMultiStyle.tsx
│   │   │   └── AnimatedLetter.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/      ← Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   └── Features.tsx
│   │   └── store/         ← Store-specific components
│   │       ├── ProductCard.tsx
│   │       ├── ProductGrid.tsx
│   │       ├── CartDrawer.tsx
│   │       └── CheckoutForm.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   └── Checkout.tsx
│   ├── hooks/
│   │   ├── useProducts.ts
│   │   └── useCart.ts
│   ├── services/
│   │   └── api.ts         ← Axios instance + typed request helpers
│   ├── store/
│   │   └── cartStore.ts   ← Zustand cart state
│   ├── types/
│   │   └── index.ts       ← Shared TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

### Design System
- **Background:** `#000000` (page), `#101010` (cards), `#212121` (feature cards)
- **Primary text:** `#E1E0CC` / Tailwind `primary: #DEDBC8`
- **Font:** Almarai (global) + Instrument Serif italic (accent)
- **Animations:** Framer Motion — words pull-up, scroll-linked letter opacity, card entrance scale

### Environment Variables (`app/.env`)
```
VITE_API_URL=http://localhost:3333/api
```

---

## Module 2 — `database/` (Data Layer)

### Purpose
Defines the relational schema via Sequelize models and manages migrations & seeders. This module is **consumed only by `api/`** — the frontend never touches it directly.

### Tech Stack
| Package | Why |
|---|---|
| `sequelize` | Full-featured ORM with migrations |
| `sequelize-cli` | CLI for generate/run/undo migrations & seeders |
| `pg` + `pg-hstore` | PostgreSQL driver |
| `dotenv` | Per-environment database config |
| `bcryptjs` | Password hashing in User seeder |
| `typescript` | Language; compiled to CommonJS in `dist/` |
| `ts-node` | Runtime TypeScript for sequelize-cli (`.sequelizerc`) |
| `@types/node`, `@types/bcryptjs` | Type declarations |

> Models use Sequelize v6's modern TypeScript API: `Model<InferAttributes<T>, InferCreationAttributes<T>>` with `declare` fields and `CreationOptional<T>`. `InferCreationAttributes` and `InferAttributes` are also re-exported from this package so that `api/` doesn't need a direct `sequelize` dependency.

### Entity Relationship Model
```
Category ──< Product ──< OrderItem >── Order >── User
                  └──< CartItem >── Cart >── User
                  └──< Review >── User
```

### Models
| Model | Key Fields |
|---|---|
| `User` | id, name, email, password_hash, role (customer/admin), createdAt |
| `Category` | id, name, slug, description |
| `Product` | id, name, slug, description, price, stock, images[], categoryId |
| `Order` | id, userId, status (pending/paid/shipped/delivered/cancelled), total |
| `OrderItem` | id, orderId, productId, quantity, unit_price |
| `Cart` | id, userId (unique — one cart per user) |
| `CartItem` | id, cartId, productId, quantity |
| `Review` | id, userId, productId, rating (1-5), comment |

### Directory Structure
```
packages/database/
├── src/                   ← TypeScript source
│   ├── config/
│   │   └── database.ts    ← Sequelize env config (dev/test/prod)
│   ├── models/
│   │   ├── index.ts       ← Sequelize init + associations
│   │   ├── User.ts
│   │   ├── Category.ts
│   │   ├── Product.ts
│   │   ├── Order.ts
│   │   ├── OrderItem.ts
│   │   ├── Cart.ts
│   │   ├── CartItem.ts
│   │   └── Review.ts
│   └── index.ts           ← Package entry point (re-exports all)
├── dist/                  ← Compiled output (git-ignored)
├── migrations/            ← JS — run by sequelize-cli
│   ├── 20240101000001-create-users.js
│   └── ...
├── seeders/               ← JS — run by sequelize-cli
│   └── ...
├── tsconfig.json          ← composite: true (TypeScript project reference)
└── package.json           ← main: dist/index.js, types: dist/index.d.ts
```

### Environment Variables (`database/.env`)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=apex_store
DB_USER=postgres
DB_PASSWORD=secret
```

---

## Module 3 — `api/` (REST API)

### Purpose
Express server that exposes typed REST endpoints. Imports Sequelize models from `database/` and serves JSON to the frontend.

### Tech Stack
| Package | Why |
|---|---|
| `express` | Minimal, unopinionated HTTP server |
| `cors` | Allow cross-origin requests from `app/` |
| `helmet` | Security headers |
| `express-rate-limit` | Basic DDoS protection |
| `jsonwebtoken` | Stateless auth (JWT access + refresh tokens) |
| `bcryptjs` | Password comparison |
| `zod` | Runtime request body validation |
| `morgan` | HTTP request logging |
| `dotenv` | Environment config |

### API Endpoints
```
Auth
  POST   /api/auth/register
  POST   /api/auth/login
  POST   /api/auth/refresh
  DELETE /api/auth/logout

Products
  GET    /api/products               ?category=&page=&limit=&sort=
  GET    /api/products/:slug
  POST   /api/products               [admin]
  PUT    /api/products/:id           [admin]
  DELETE /api/products/:id           [admin]

Categories
  GET    /api/categories
  GET    /api/categories/:slug
  POST   /api/categories             [admin]
  PUT    /api/categories/:id         [admin]
  DELETE /api/categories/:id         [admin]

Cart
  GET    /api/cart                   [auth]
  POST   /api/cart/items             [auth]
  PUT    /api/cart/items/:itemId     [auth]
  DELETE /api/cart/items/:itemId     [auth]
  DELETE /api/cart                   [auth]

Orders
  GET    /api/orders                 [auth] (own orders)
  GET    /api/orders/:id             [auth]
  POST   /api/orders                 [auth] (checkout)
  PUT    /api/orders/:id/status      [admin]

Reviews
  GET    /api/products/:id/reviews
  POST   /api/products/:id/reviews   [auth]
  DELETE /api/reviews/:id            [auth | admin]

Users
  GET    /api/users/me               [auth]
  PUT    /api/users/me               [auth]
  GET    /api/users                  [admin]
```

### Directory Structure
```
packages/api/
├── src/                     ← TypeScript source
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── cart.ts
│   │   ├── orders.ts
│   │   ├── reviews.ts
│   │   └── users.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── productController.ts
│   │   ├── categoryController.ts
│   │   ├── cartController.ts
│   │   ├── orderController.ts
│   │   ├── reviewController.ts
│   │   └── userController.ts
│   ├── middleware/
│   │   ├── auth.ts          ← JWT verify
│   │   ├── adminOnly.ts     ← Role guard
│   │   ├── validate.ts      ← Zod schema validator
│   │   └── errorHandler.ts  ← Global error boundary
│   ├── types/
│   │   └── express.d.ts     ← Extends Express.Request with req.user
│   └── app.ts               ← Express bootstrap
├── dist/                    ← Compiled output (git-ignored)
├── tsconfig.json            ← references: ../database
├── .env.example
└── package.json             ← dep: apex-store-database workspace:*
```

### Environment Variables (`api/.env`)
```
PORT=3333
DATABASE_URL=postgres://postgres:secret@localhost:5432/apex_store
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

---

## Cross-Module Data Flow

```
Browser (app/)
    │
    │  HTTPS/JSON  (axios → VITE_API_URL)
    ▼
Express Server (api/)
    │
    │  Sequelize ORM  (require('../database/models'))
    ▼
PostgreSQL (database/)
```

## Local Development Setup

```bash
# 1. Install all deps
cd app && npm install
cd ../api && npm install
cd ../database && npm install

# 2. Spin up Postgres (Docker)
docker run -d --name apex-pg -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres:16

# 3. Run migrations + seeders
cd database
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# 4. Start API
cd ../api && npm run dev       # → localhost:3333

# 5. Start App
cd ../app && npm run dev       # → localhost:5173
```

## Naming Conventions
- **Files:** kebab-case for routes/controllers, PascalCase for React components and Sequelize models
- **DB columns:** snake_case
- **API responses:** camelCase JSON
- **CSS:** Tailwind utilities only; custom classes only for SVG noise textures
