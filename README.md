# CMS Dashboard – Next.js Fullstack Project

A fullstack CMS dashboard built with **Next.js 16**, **TypeScript**, **Prisma**, and **React Query**.

This project demonstrates user management features including authentication, CRUD operations, pagination, search, charts, and frontend testing.

---

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Query
- React Hook Form + Zod
- Recharts

### Backend
- Next.js API Routes
- Prisma ORM
- SQLite (local development)
- JWT Authentication
- bcrypt

### Testing
- Jest
- React Testing Library

---

##  Features

-  Authentication (Register / Login)
-  User Management (CRUD)
-  Search & Pagination
-  Dashboard with charts
-  Modular component structure
-  Frontend unit tests
-  Responsive UI

---

##  Dashboard Preview

Includes:
- Total users
- Monthly user statistics
- Latest registered users
- Pie chart visualization

---

## Important Note

This project uses **SQLite**, which works in local development only.

When deployed on platforms like **Vercel**, database persistence is not available.
For production usage, SQLite should be replaced with PostgreSQL or another hosted database.

---

##  Local Development

```bash
git clone https://github.com/MehrnooshSharifi/cms-dashboard-nextjs
cd cms-dashboard-nextjs

npm install
npx prisma migrate dev
npm run dev
