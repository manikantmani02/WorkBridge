# Quickstart

1. Copy `.env.example` files from backend and frontend to `.env`/`.env.local` and fill values.
2. Run `npm install` at repo root to install workspace dependencies.
3. Start backend: `npm run dev:backend` (Express + MongoDB).
4. Start frontend: `npm run dev:frontend` (Next.js App Router).
5. Open http://localhost:3000 for the UI.

## OTP Flow
- Request OTP on login page; backend logs OTP to console and stores it in MongoDB with a 10-minute expiry.
- Verify OTP to receive JWT; frontend stores token and redirects based on selected role.

## Deployment
See docs/DEPLOYMENT.md for Docker, environment, and scaling guidance.
