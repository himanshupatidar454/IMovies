# IMovies — Movie Ticket Booking

A full-stack MERN starter application for browsing movies, choosing a show, selecting seats, and creating bookings.

## Stack
- React + Vite
- Express + Node.js
- MongoDB + Mongoose
- JWT authentication + bcryptjs
- React Router

## Requirements
- Node.js 20+
- MongoDB Community Server or a MongoDB Atlas connection string

## Setup

### 1. Backend
```bash
cd server
cp .env.example .env
npm install
npm run seed
npm run dev
```
Set `MONGODB_URI` in `server/.env`. The API runs at `http://localhost:5000`.

### 2. Frontend
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
Open the URL printed by Vite (usually `http://localhost:5173`).

### Demo admin
After seeding, the admin user is:
- Email: `admin@imovies.local`
- Password: `Admin123!`

Change this password before using the app outside a local demo.

## Main API routes
- `GET /api/health`
- `GET /api/movies`
- `GET /api/movies/:id`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (JWT required)
- `GET /api/shows?movieId=<id>`
- `POST /api/bookings` (JWT required)
- `GET /api/bookings/mine` (JWT required)
- `GET /api/admin/summary` (admin JWT required)

## Important notes
- Payments are represented as a demo checkout flow only. No real payment is taken.
- Seat availability is checked by the API before a booking is created, but a production deployment should use a MongoDB transaction and a unique seat/show constraint to prevent race conditions.
- Add a real payment provider, email notifications, production logging, rate limiting, tests, and deployment secrets before production use.
- Never commit `.env` or real credentials.
