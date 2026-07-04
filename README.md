# StockFlow

Stock management app, simple aur beginner friendly.

## Tech Stack

### Frontend
- **Next.js 15** (App Router) - Full stack framework, SEO acha, deployment easy
- **TypeScript** - Errors kam, code likhne me confidence
- **TailwindCSS 4** - Utility classes, CSS nahi likhna padta
- **shadcn/ui** - Copy-paste components, apne hisaab se modify kar sakte ho
- **React Hook Form** - Forms handle karta hai, validation sab sambhal leta hai
- **Zod** - TypeScript validation, schema banao types auto generate
- **TanStack Query** - Server data fetch/cache/update, loading states handle
- **Lucide** - Icons, light weight aur simple
- **Sonner** - Toast notifications

### Backend
- **Next.js API Routes** - Alag Express server nahi, Next.js hi full stack hai
- **Better Auth** - Session based authentication, setup easy
- **Prisma** - ORM, typesafe queries, migrations
- **PostgreSQL** - Relational database
- **Redis** - Session caching, fast access

### Folder Structure
```
stockflow/
  prisma/
    schema.prisma         Database models
    migrations/           Auto-generated migrations
  src/
    app/
      api/auth/[...all]/  Better Auth API
      login/              Login page
      globals.css         Styles
      layout.tsx          Root layout
      page.tsx            Home page
    components/
      ui/button.tsx       shadcn button
      login-form.tsx      Login form
      providers.tsx       TanStack Query + Sonner
    lib/
      auth.ts             Better Auth config
      auth-client.ts      Client auth
      prisma.ts           Prisma client
      redis.ts            Redis connection
      schemas.ts          Zod schemas
      actions.ts          Server actions
      types.ts            Common types
    middleware.ts         Auth protection
```

## Setup

### 1. Install
```bash
cd stockflow
npm install
```

### 2. Environment
`.env` file already hai. Apne hisaab se change karo:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/stockflow?schema=public"
REDIS_URL="redis://localhost:6379"
BETTER_AUTH_SECRET="apna-random-secret-daalo-32-char-plus"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Docker
```bash
docker compose up -d
```
PostgreSQL (5433) aur Redis (6379) start ho jayenge.

### 4. Database tables
```bash
npx prisma migrate dev --name init
```

### 5. Dev server
```bash
npm run dev
```
App chalega http://localhost:3000 pe.

## Kaise kaam karta hai

### Auth flow
1. User login form me email/password daalta hai
2. React Hook Form + Zod validation check karta hai
3. Server action `signIn()` call hota hai
4. Better Auth database me check karta hai
5. Session create hota hai, Redis me cache hota hai
6. User redirect home page pe
7. Dashboard routes middleware se protect hain

### Folders kyu aise rakhe
- **app/** - Next.js pages aur API routes
- **components/** - UI components
- **lib/** - Config, auth, database, validation sab
- **middleware.ts** - Route protection

## Important packages
- next ^15.5
- @prisma/client ^7.8
- @prisma/adapter-pg
- pg
- better-auth ^1.6
- ioredis
- @tanstack/react-query ^5.101
- zod ^4.4
- react-hook-form ^7.80
- sonner ^2.0
- lucide-react ^1.23

## Build
```bash
npm run build
```

## Kya missing hai abhi?
Ye sirf initial setup hai. Actual features abhi nahi hai. Yeh scaffold hai jisme tum apna code likh sakte ho.
