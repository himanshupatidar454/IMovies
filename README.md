# IMovies — Movie Ticket Booking

A full-stack MERN starter application for browsing movies, choosing showtimes, selecting seats, and managing bookings.

## Stack
- React + Vite frontend
- Node.js + Express backend
- MongoDB + Mongoose
- JWT authentication and bcrypt password hashing

## Project setup
Download the project ZIP from the conversation and extract it. The README inside the ZIP has complete setup details.

### Backend
```bash
cd server
cp .env.example .env
npm install
npm run seed
npm run dev
```
Set `MONGODB_URI` in `server/.env` to your MongoDB connection string.

### Frontend (new terminal)
```bash
cd client
npm install
npm run dev
```
Open the Vite URL shown in the terminal (usually http://localhost:5173).

## Notes
- Payment is demo-only; no real transaction is processed.
- Do not commit `.env` or credentials.
- Review and test all functionality before submission/deployment.

## Full project files
The complete starter project ZIP is available from the ChatGPT conversation: `IMovies-MERN-Project.zip`.