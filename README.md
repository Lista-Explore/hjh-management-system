# HJH Management System

A comprehensive digital platform for Hera Jo Highway Self-Help Group, featuring:
- **Public Website** — Information, governance, announcements
- **Member Portal** — Secure access to savings, shares, loans, statements
- **Management Portal** — Financial dashboards, member management, audit tracking

## Project Structure

```
hjh-management-system/
├── frontend/          # Next.js React app
├── backend/           # Express.js API server
├── docs/              # Documentation
└── README.md
```

## Tech Stack

- **Frontend:** Next.js, React, TailwindCSS
- **Backend:** Node.js, Express, PostgreSQL
- **Auth:** JWT-based authentication
- **Hosting:** Vercel (frontend) + Railway (backend)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL 14+

### Installation

1. **Frontend:**
```bash
cd frontend
npm install
npm run dev
```

2. **Backend:**
```bash
cd backend
npm install
npm run dev
```

## Database

PostgreSQL database with schema for:
- Members and authentication
- Savings and shares management
- Loans and credit administration
- Management reporting
- Audit and compliance tracking

## Deployment

- Frontend: Deployed to Vercel (automatic on git push)
- Backend: Deployed to Railway (automatic on git push)

## Documentation

See `/docs` for detailed architecture and setup guides.
