# Installation

## Prerequisites
- Node.js 18+
- MongoDB (local or hosted)
- Redis (optional, for caching/rate-limit backing)

## Steps
1. Clone repo and `cd` into it.
2. Run `npm install` to install workspace dependencies.
3. Configure environment variables in backend `.env` and frontend `.env.local` using provided examples.
4. Start backend (`npm run dev:backend`) then frontend (`npm run dev:frontend`).
