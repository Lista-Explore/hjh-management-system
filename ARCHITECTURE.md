# System Architecture

## Overview

The HJH Management System is a three-layer web application built with modern, scalable technologies.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                               │
└──────────────┬──────────────────────────────┬────────────────┘
               │                              │
               ▼                              ▼
        ┌─────────────┐              ┌─────────────┐
        │   BROWSER   │              │   BROWSER   │
        │ (Chrome etc)│              │ (Safari etc)│
        └──────┬──────┘              └──────┬──────┘
               │                            │
               │   HTTPS / REST API         │
               └────────────┬───────────────┘
                            │
        ┌───────────────────▼───────────────────┐
        │      VERCEL (CDN + Frontend)          │
        │                                       │
        │  ┌─────────────────────────────────┐  │
        │  │  Next.js (React App)            │  │
        │  │  - Public Website               │  │
        │  │  - Member Portal                │  │
        │  │  - Management Portal            │  │
        │  │  - TailwindCSS Styling          │  │
        │  └─────────────────────────────────┘  │
        └───────────────────┬───────────────────┘
                            │
                            │ HTTP/REST
                            │
        ┌───────────────────▼───────────────────┐
        │    RAILWAY / HEROKU (Backend)        │
        │                                       │
        │  ┌─────────────────────────────────┐  │
        │  │  Express.js API Server          │  │
        │  │  - Authentication               │  │
        │  │  - Member Management            │  │
        │  │  - Financial Transactions       │  │
        │  │  - Reporting & Analytics        │  │
        │  └─────────────────────────────────┘  │
        └───────────────────┬───────────────────┘
                            │
                            │ TCP (Port 5432)
                            │
        ┌───────────────────▼───────────────────┐
        │   PostgreSQL Database                 │
        │                                       │
        │  ┌─────────────────────────────────┐  │
        │  │  Tables:                        │  │
        │  │  - users                        │  │
        │  │  - savings_accounts             │  │
        │  │  - shares                       │  │
        │  │  - loans                        │  │
        │  │  - transactions                 │  │
        │  │  - management_actions           │  │
        │  │  - audit_logs                   │  │
        │  └─────────────────────────────────┘  │
        └───────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework:** Next.js 14 (React 18)
- **Styling:** TailwindCSS
- **HTTP Client:** Axios
- **Hosting:** Vercel (automatic deployments)
- **State Management:** React hooks + localStorage

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** JWT (JSON Web Tokens)
- **Database Driver:** pg (PostgreSQL)
- **Security:** bcrypt for passwords
- **Hosting:** Railway / Heroku
- **Middleware:** CORS, body-parser

### Database
- **Type:** PostgreSQL (Relational)
- **Scalability:** Can handle 10K+ members
- **Backup:** Automated by hosting provider
- **Performance:** Optimized with indexes

## Authentication Flow

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  1. User enters email/password                      │
│     ↓                                               │
│  2. Frontend sends to /api/auth/login               │
│     ↓                                               │
│  3. Backend verifies credentials (bcrypt check)     │
│     ↓                                               │
│  4. Backend generates JWT token (24h expiry)        │
│     ↓                                               │
│  5. Token stored in browser localStorage            │
│     ↓                                               │
│  6. All future requests include token in header     │
│     ↓                                               │
│  7. Backend validates token for each request        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## Data Flow Example: Member Login

```
Browser                          Backend                    Database
   │                               │                           │
   │─ POST /auth/login ────────────>│                           │
   │   {email, password}            │                           │
   │                                │─ Query user by email ────>│
   │                                │<─ Return user record ─────│
   │                                │                           │
   │                                │ Verify password (bcrypt)  │
   │                                │ Generate JWT token        │
   │                                │                           │
   │<─── {token, user} ─────────────│                           │
   │                                │                           │
   │ Store token in localStorage    │                           │
   │ Redirect to dashboard          │                           │
   │                                │                           │
```

## Security Measures

1. **Password Security**
   - Passwords hashed with bcrypt (salt rounds: 10)
   - Never stored in plain text
   - Never sent back to frontend

2. **Authentication**
   - JWT tokens with 24-hour expiry
   - Tokens verified on every request
   - Tokens stored securely in browser

3. **Authorization**
   - Role-based access control (member vs manager)
   - Manager-only endpoints verified server-side
   - No sensitive data exposed in tokens

4. **CORS Protection**
   - Only allows requests from frontend origin
   - Credentials required for cross-origin requests

5. **Database Security**
   - SQL prepared statements (prevents SQL injection)
   - Connection pooling
   - Automated backups

## Scalability Considerations

### Database
- Indexes on frequently queried columns
- Optimized queries
- Connection pooling
- Automated backups and replication

### Backend
- Stateless API (can run multiple instances)
- Environment-based configuration
- Request validation middleware
- Error handling and logging

### Frontend
- Static site generation where possible
- Image optimization
- Code splitting
- Caching strategies

## Performance Targets

- Page load time: <3 seconds
- API response time: <500ms
- Database queries: <100ms
- Mobile friendly: Responsive design

## Deployment Pipeline

```
Git Repository
    ↓
GitHub Webhook
    ↓
Vercel (Frontend)  →  Automated Build & Deploy
Railway (Backend)  →  Automated Build & Deploy
    ↓
Live on Internet
    ↓
Users Access
```

## Disaster Recovery

1. **Database Backups**
   - Automatic daily backups
   - Point-in-time recovery
   - Replicated across regions

2. **Failover**
   - Automatic failover to backup database
   - Load balancing across instances
   - Health checks and monitoring

3. **Data Recovery**
   - 30-day backup retention
   - Tested recovery procedures
   - Audit logs for compliance

## Future Enhancements

1. **Notifications**
   - Email notifications for transactions
   - SMS alerts for loan reminders
   - Push notifications via mobile app

2. **Analytics**
   - Advanced financial dashboards
   - Member behavior analytics
   - Predictive insights

3. **Mobile Apps**
   - React Native for iOS/Android
   - Offline-first capabilities
   - Biometric authentication

4. **API Gateway**
   - Rate limiting
   - API versioning
   - Webhook support

5. **Search & Filtering**
   - Full-text search
   - Advanced filtering options
   - Saved searches

## Monitoring & Logging

- Backend: Logging to Railway/Heroku logs
- Frontend: Error tracking via Vercel
- Database: Performance monitoring
- User activity: Audit logs in database

---

This architecture ensures reliability, scalability, and security while keeping the system maintainable and cost-effective.
