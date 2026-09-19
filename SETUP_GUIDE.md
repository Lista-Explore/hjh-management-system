# HJH Management System - Setup & Deployment Guide

## Overview

This is a complete web application for Hera Jo Highway Self-Help Group with three interconnected portals:
- **Public Website** — Information and announcements
- **Member Portal** — Personal savings, shares, loans management
- **Management Portal** — Financial dashboards and reporting

## Project Structure

```
hjh-management-system/
├── frontend/          # Next.js React application (Vercel)
├── backend/           # Express.js API (Railway or similar)
├── README.md          # Project overview
└── SETUP_GUIDE.md     # This file
```

## Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **PostgreSQL** 14+ ([download](https://www.postgresql.org/))
- **Git** ([download](https://git-scm.com/))
- A **GitHub** account (for deployments)
- A **Vercel** account (for frontend hosting) - Free tier available
- A **Railway** account (for backend hosting) - Free tier available

## Local Setup

### 1. Backend Setup

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_USER=postgres
# DB_PASSWORD=your-password
# DB_NAME=hjh_db

# Install dependencies
npm install

# Create database (using PostgreSQL)
createdb hjh_db

# Run migrations
npm run migrate

# Start backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend

# Copy environment file
cp .env.local.example .env.local

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Testing Locally

1. **Open browser** → `http://localhost:3000`
2. **Click "Register"** to create a member account
3. **Login** with your credentials
4. **Access member portal** → View savings, loans, shares
5. **As manager** → Login with manager role to access `/dashboard`

## Deployment

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/hjh-management-system.git
   git push -u origin main
   ```

2. **Visit [Vercel.com](https://vercel.com)**
   - Click "New Project"
   - Select your GitHub repository
   - Set "Root Directory" to `frontend`
   - Click "Deploy"

3. **Set Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL=https://your-backend-url/api`

### Backend Deployment (Railway)

1. **Visit [Railway.app](https://railway.app)**
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository

2. **Add PostgreSQL Plugin**
   - Click "Add" in Railway
   - Select "PostgreSQL"
   - Railway will set DB credentials automatically

3. **Set Environment Variables**
   - Go to Variables tab
   - Add all variables from `.env.example`
   - Railway auto-generates DB credentials

4. **Deploy**
   - Railway automatically deploys on git push
   - Your API will be at `https://your-railway-app.railway.app/api`

## Database Schema

The system includes tables for:
- **users** — Member accounts and authentication
- **savings_accounts** — Member savings balances
- **shares** — Share holdings
- **loans** — Member loans
- **loan_repayments** — Repayment schedules
- **transactions** — Financial transaction history
- **management_actions** — Action register
- **audit_logs** — System audit trail

## Key Features

### Member Portal
- View savings account balance
- Track share holdings
- Manage loans and view repayment schedule
- Download account statements
- View transaction history

### Management Portal
- Dashboard with key metrics
- Member management
- Financial reporting
- Management action register
- Audit & compliance tracking

### Public Website
- Company information
- Governance structure
- Programs and projects overview
- Member registration and login

## API Endpoints

### Authentication
- `POST /api/auth/register` — Register new member
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get current user

### Member Features
- `GET /api/members` — List all members
- `GET /api/savings` — Get savings account
- `GET /api/loans` — Get member's loans
- `GET /api/loans/:id/schedule` — Get repayment schedule

### Management Features
- `GET /api/management/dashboard` — Dashboard metrics
- `GET /api/management/reports/financial` — Financial reports
- `GET /api/management/actions` — Management action register

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Verify PostgreSQL is running
psql -U postgres -d hjh_db

# Check environment variables
cat .env
```

### Frontend won't load
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Database connection errors
```bash
# Verify PostgreSQL credentials
psql -U postgres -h localhost -d hjh_db

# Run migrations again
npm run migrate
```

## Next Steps

1. **Customize branding** — Update colors, logos, company info
2. **Add more features** — Member notifications, advanced reporting
3. **Setup email** — Integrate for notifications and password resets
4. **Mobile app** — Consider React Native for iOS/Android apps
5. **Backup strategy** — Set up automated database backups

## Support

For questions or issues, refer to:
- Next.js docs: https://nextjs.org/docs
- Express.js docs: https://expressjs.com/
- PostgreSQL docs: https://www.postgresql.org/docs/
- Railway docs: https://docs.railway.app/
- Vercel docs: https://vercel.com/docs

---

**Your HJH Management System is ready for deployment!**
