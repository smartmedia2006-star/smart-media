# Smart Media Operations Platform

Production-ready operations website for Smart Media — Nepal's leading DOOH advertising company. Built with Next.js 14 App Router, PostgreSQL, BullMQ, and multi-channel messaging.

**Live:** https://smartmedia.com.np

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development Setup](#local-development-setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Third-Party Service Setup](#third-party-service-setup)
- [Running in Production](#running-in-production)
- [Docker Deployment](#docker-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Admin Access](#admin-access)

---

## Overview

Smart Media's platform combines:
- **Public SEO frontend** — 10+ landing pages targeting high-value advertising keywords for Nepal
- **Admin CRM backend** — Clients, Assets, Contracts, Invoices, Inventory management
- **Automation engine** — BullMQ scheduled reminders via WhatsApp, Telegram, and Email
- **Analytics** — Revenue charts, occupancy breakdowns, contract pipeline

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Database | PostgreSQL 16 + Prisma ORM |
| Auth | NextAuth.js v4 (JWT, Credentials + Google OAuth) |
| Queue | BullMQ + Redis 7 |
| Styling | TailwindCSS 3 + Headless UI |
| Forms | React Hook Form + Zod |
| Tables | TanStack React Table v8 |
| Charts | Recharts |
| WhatsApp | Twilio (WhatsApp Business API) |
| Email | Zoho Mail (OAuth2 SMTP) |
| Telegram | Telegram Bot API |

---

## Project Structure

```
smart-media/
├── prisma/
│   ├── schema.prisma       # Full DB schema
│   └── seed.ts             # Demo data seed
├── public/
│   ├── robots.txt
│   └── uploads/            # File upload target (gitignored)
├── src/
│   ├── app/
│   │   ├── (public)/       # Public SEO pages
│   │   ├── (admin)/        # Admin panel (auth-gated)
│   │   └── api/            # API route handlers
│   ├── components/
│   │   ├── admin/          # Admin-specific components
│   │   ├── public/         # Public-facing components
│   │   └── ui/             # Shared UI primitives
│   ├── lib/                # Core utilities and services
│   └── styles/
│       └── globals.css
├── workers/
│   ├── reminder.worker.ts  # BullMQ reminder processor
│   ├── daily.cron.ts       # Daily scheduled jobs
│   └── index.ts            # Worker entry point
├── Dockerfile              # App container
├── Dockerfile.worker       # Worker container
└── docker-compose.yml      # Full stack compose
```

---

## Local Development Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 16
- Redis 7
- npm or pnpm

### 1. Clone and Install

```bash
git clone https://github.com/your-org/smart-media.git
cd smart-media
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your values (see Environment Variables section)
```

### 3. Database Setup

```bash
# Run migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Seed demo data
npx prisma db seed
```

### 4. Run Development Server

```bash
# Terminal 1 — Next.js app
npm run dev

# Terminal 2 — BullMQ reminder worker
npm run worker
```

App: http://localhost:3000  
Admin: http://localhost:3000/admin  
Prisma Studio: `npx prisma studio`

---

## Environment Variables

Copy `.env.example` to `.env` and fill in all values. Key variables:

### Required

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random secret (run `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Full URL of your app |
| `REDIS_URL` | Redis connection URL |

### Google OAuth (optional but recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → APIs & Services → Credentials → OAuth 2.0 Client ID
3. Set Authorized redirect URI: `https://yourdomain.com/api/auth/callback/google`
4. Copy Client ID and Secret to `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`

### Twilio WhatsApp

1. Sign up at [twilio.com](https://twilio.com)
2. Activate WhatsApp Sandbox or WhatsApp Business
3. Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM`

### Telegram Bot

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Run `/newbot` — copy the token to `TELEGRAM_BOT_TOKEN`
3. Clients must start your bot and share their Chat ID

### Zoho Mail OAuth2

1. Go to [Zoho API Console](https://api-console.zoho.com)
2. Create Server-based Application
3. Set redirect URI to `https://yourdomain.com/api/zoho/callback`
4. Scopes: `ZohoMail.messages.CREATE`
5. Copy Client ID/Secret to `ZOHO_CLIENT_ID` / `ZOHO_CLIENT_SECRET`
6. Visit `/api/zoho/callback?code=...` after authorizing to complete token exchange

---

## Running in Production

### Build

```bash
npm run build
```

### Start App

```bash
npm start
```

### Start Worker

```bash
node -r ts-node/register/transpile-only workers/index.ts
```

### Run Migrations in Production

```bash
npx prisma migrate deploy
```

---

## Docker Deployment

### Start Full Stack

```bash
docker-compose up -d
```

This starts:
- `postgres` — PostgreSQL 16
- `redis` — Redis 7
- `app` — Next.js on port 3000
- `worker` — BullMQ reminder processor

### Run Migrations

```bash
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npx prisma db seed
```

### View Logs

```bash
docker-compose logs -f app
docker-compose logs -f worker
```

---

## Vercel Deployment

1. Push to GitHub
2. Import project in [Vercel dashboard](https://vercel.com)
3. Set all environment variables from `.env.example`
4. Deploy

**Note:** BullMQ workers cannot run on Vercel Serverless. For reminders:
- Use a separate VPS/server for `workers/index.ts`
- Or use [Railway](https://railway.app) / [Render](https://render.com) with the `Dockerfile.worker`
- Or use Vercel Cron Jobs for simpler scheduled tasks

---

## Admin Access

After seeding the database, log in with:

| Role | Email | Password |
|---|---|---|
| Super Admin | admin@smartmedia.com.np | SmartMedia@2025 |
| Manager | manager@smartmedia.com.np | SmartMedia@2025 |

**Admin URL:** `/admin`

### Role Permissions

| Feature | Super Admin | Manager | Viewer |
|---|---|---|---|
| View all data | ✓ | ✓ | ✓ |
| Create/edit | ✓ | ✓ | ✗ |
| Delete/terminate | ✓ | ✓ | ✗ |
| Settings | ✓ | ✗ | ✗ |
| User management | ✓ | ✗ | ✗ |

---

## SEO Target Keywords

The platform is optimized for:
- `advertising Nepal` → `/advertising-nepal`
- `airport advertising Nepal` → `/airport-advertising-nepal`
- `OOH Nepal` → `/ooh-nepal`
- `billboard Nepal` → `/billboard-nepal`
- `digital screens Nepal` → `/digital-screens-nepal`
- `transit advertising Nepal` → `/transit-advertising-nepal`
- `mall advertising Nepal` → `/mall-advertising-nepal`

---

## License

Proprietary — Smart Media Pvt. Ltd. All rights reserved.
