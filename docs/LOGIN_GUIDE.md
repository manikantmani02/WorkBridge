# Login Guide

1. Open `/login` on the frontend.
2. Enter phone number and choose role (Worker or Customer).
3. Click "Send OTP". Backend logs OTP to console and stores it in MongoDB (10 min expiry).
4. Enter received OTP and submit. On success, you get a JWT and are redirected to the role-specific dashboard.
5. Subsequent requests include `Authorization: Bearer <token>`.
