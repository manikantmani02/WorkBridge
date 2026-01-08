# Deployment

## Docker Compose
- Backend: build from `backend/Dockerfile`, exposes 4000
- Frontend: build from `frontend/Dockerfile`, exposes 3000
- MongoDB: official image, persisted volume

## Environment
- Use `.env` for backend and `.env.local` for frontend; never commit secrets.

## Production Notes
- Enable HTTPS and secure cookies in reverse proxy (NGINX/Traefik)
- Set JWT secrets and OTP SMS provider keys
- Configure CORS to allowed origins
- Add Redis for rate limiting and caching
- Horizontal scale backend behind load balancer; sticky sessions not required because JWT stateless
