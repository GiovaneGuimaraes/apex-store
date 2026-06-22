# APEX Store — Mocked

Repositório de estudo que simula uma loja de tênis e streetwear chamada **APEX**. Todos os dados são mockados — não há integração com pagamento, estoque real ou autenticação em produção. O objetivo é ter uma base full-stack completa para explorar arquitetura de monorepo, design system e APIs REST tipadas.

## Stack

| Camada | Tecnologia |
|---|---|
| App | Vite · React 18 · TypeScript · Tailwind CSS · Framer Motion · Zustand · TanStack Query |
| API | Express · TypeScript · Zod · JWT |
| Database | Sequelize v6 · TypeScript · PostgreSQL |
| Monorepo | pnpm workspaces |

## Estrutura

```
loja-mocked/
├── packages/
│   ├── app/          ← frontend (Vite + React)
│   ├── api/          ← REST API (Express)
│   └── database/     ← modelos e migrations (Sequelize)
├── docs/
│   └── modules.md    ← arquitetura detalhada dos módulos
├── pnpm-workspace.yaml
└── package.json
```

## Instalação

```bash
# instalar todas as dependências do monorepo de uma vez
pnpm install
```

## Scripts

```bash
# build completo (database → api → app)
pnpm build

# builds individuais
pnpm build:db
pnpm build:api
pnpm build:app

# desenvolvimento
pnpm dev:app   # Vite dev server — http://localhost:5173
pnpm dev:api   # ts-node — http://localhost:3000
```

## Variáveis de ambiente

Cada pacote tem seu próprio `.env`. Copie os `.env.example` como ponto de partida:

```bash
cp packages/api/.env.example      packages/api/.env
cp packages/database/.env.example packages/database/.env
```

Variáveis mínimas para rodar localmente:

```env
# packages/database/.env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=apex_store
DB_USER=postgres
DB_PASSWORD=postgres

# packages/api/.env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/apex_store
JWT_SECRET=seu_secret_aqui
PORT=3000
```

## Aviso

Este repositório é uma **loja mockada para fins de estudo**. Nenhum produto, preço ou usuário é real. Imagens são SVGs gerados localmente. Não use em produção.
