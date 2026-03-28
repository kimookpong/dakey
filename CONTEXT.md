# RahatLab System Context

RahatLab is a robust, mobile-responsive server and domain management system built for high-security and audit-ready environments.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM (v7)
- **Authentication**: JWT-based (jose) with Single Session Enforcement
- **Security**: AES-256-GCM encryption for sensitive server credentials
- **Styling**: Vanilla CSS with a premium dark-mode aesthetic

## 🏗 Architecture
- **API Strategy**: Server Actions and Route Handlers with session validation
- **Middleware**: Edge-compatible proxy for authentication and session guarding
- **Session Layer**: Specialized `lib/session.ts` to bypass Edge runtime limitations with Prisma

## 📊 Core Models
- **Server**: Stores SSH/SFTP/FTP credentials (encrypted)
- **Domain**: Tracks web services, hosting links, and health status
- **Transaction**: Financial ledger for income and expenses linked to assets
- **UpdateNote**: Audit trail for all modifications to servers and domains
- **AdminSession**: Singleton record for enforcing single-device login

## 🔐 Security Features
- **Password at Rest**: All server passwords are encrypted using `crypto` before storage.
- **Session Hijacking Prevention**: New login automatically invalidates all previous session IDs in the DB.
- **Edge Security**: Middleware ensures no unauthorized access to `/api` or `/dashboard`.

## 🚀 Deployment
- Optimized for Vercel/Node.js environments with environment-variable based configuration.
