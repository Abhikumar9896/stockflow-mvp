# StockFlow

A multi-tenant SaaS inventory management system. Sign up your organization, add products, track stock levels, and get alerted on low inventory.

Built for small sellers and internal teams who need a fast, no-frills way to manage their catalog.

## Features

- **Multi-tenant auth** — sign up with your organization name, email, and password. Every org gets its own isolated data.
- **Product management** — create, edit, delete, and search products by name or SKU.
- **Stock tracking** — set quantities and low-stock thresholds per product or globally.
- **Dashboard** — see total products, total stock, and a low-stock alert list at a glance.
- **Low-stock logic** — a product is flagged "Low Stock" when its quantity is at or below its threshold. Falls back to a global default if no per-product threshold is set.
- **Settings** — configure a default low-stock threshold for your organization.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma (with driver adapter for serverless) |
| Auth | Better Auth (email/password, session-based) |
| Forms | React Hook Form + Zod |
| UI | Tailwind CSS 4 + shadcn/ui + Lucide icons |
| Cache | Redis (optional — falls back to DB-only sessions) |
| Deployment | Vercel (recommended) |

## Project Structure

```
stockflow/
  app/                          Next.js pages and API routes
    (auth)/                     Login and signup pages
    (dashboard)/                Dashboard, products, settings pages
    api/auth/[...all]/          Better Auth API route
  components/
    dashboard/                  Dashboard-specific components
    forms/                      Auth forms (login, signup)
    layout/                     Navbar
    products/                   Product list, table, row, form, dialogs
    settings/                   Settings form
    shared/                     Reusable components (AppLogo, AuthCard, PageHeader, StatCard)
    ui/                         Base UI primitives (Button, Card)
  lib/
    actions/                    Server actions (auth, product, settings)
    auth/                       Auth helpers and middleware utilities
    services/                   Business logic layer (product, settings, dashboard)
    utils/                      Shared utilities (number serialization, status labels, threshold logic, form resolver)
    auth.ts                     Better Auth server configuration
    auth-client.ts              Better Auth client configuration
    db.ts                       Prisma client singleton
    redis.ts                    Redis client (optional)
  schemas/                      Zod validation schemas (login, signup, product)
  types/                        TypeScript type definitions
  prisma/
    schema.prisma               Database schema
    migrations/                 Database migrations
  middleware.ts                 Route protection (redirects to /login)
```

## Getting Started

### Prerequisites

- Node.js 20+
- Docker (for local PostgreSQL + Redis)
- A Neon PostgreSQL URL for production (or any PostgreSQL instance)

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL and Redis
docker compose up -d

# 3. Run database migrations
npx prisma migrate dev

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up with your organization name, email, and password.

### Environment Variables

```
DATABASE_URL       PostgreSQL connection string
REDIS_URL          Redis URL (optional — app works without it)
BETTER_AUTH_SECRET Random 32-byte base64 secret (generate with `openssl rand -base64 32`)
BETTER_AUTH_URL    Your deployment URL (e.g., http://localhost:3000 or https://stockflow.vercel.app)
```

Copy `.env.example` to `.env` and fill in the values.

## Deployment

### Vercel

1. Push this repo to GitHub.
2. Import the project on [Vercel](https://vercel.com).
3. Add the environment variables listed above.
4. Deploy. The build script runs `prisma generate && next build` automatically.
5. After the first deploy, run `npx prisma migrate deploy` against your production database to create the tables.

## License

MIT
