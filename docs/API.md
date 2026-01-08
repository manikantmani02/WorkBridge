# API

Base URL: `http://localhost:4000/api`

## Auth
- `POST /auth/send-otp` — body `{ phone, role }`; logs OTP to server console, persists with expiry.
- `POST /auth/verify-otp` — body `{ phone, otp }`; returns JWT and user profile.
- `GET /auth/me` — bearer JWT; returns profile.

## Jobs & Bookings (stubs)
- `POST /jobs` — create job (customer).
- `GET /jobs` — list jobs (role-aware filtering).
- `POST /bookings` — instant booking.
- `PATCH /bookings/:id/status` — update lifecycle.

## Payments (stubs)
- `POST /payments/intent` — create payment intent (Razorpay/Stripe ready).

## Notifications (stubs)
- `POST /notifications/push` — trigger push/SMS hook.

Refer to inline comments in backend route files for request/response shapes.
