# Production Deployment Guide

## Prerequisites

- Node.js 18+ installed
- A backend API server implementing the required endpoints
- HTTPS-enabled domain for production

## Environment Setup

1. **Create production environment file:**

```bash
cp .env.example .env.production
```

2. **Configure environment variables:**

```env
# Production API URL (your backend server)
VITE_API_BASE_URL=https://api.yourdomain.com

# API timeout in milliseconds
VITE_API_TIMEOUT=30000
```

## Backend API Requirements

Your backend must implement these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/google-play/test-connection` | POST | Validate Google Play API credentials |
| `/api/google-play/config` | POST | Save configuration to database |
| `/api/google-play/webhook/test` | POST | Send test webhook event |
| `/api/google-play/connect` | POST | Complete app connection |

### Request/Response Format

All endpoints accept JSON and return:

```json
{
  "success": true,
  "message": "Operation completed successfully"
}
```

## Build for Production

```bash
# Install dependencies
npm install

# Run tests
npm run test:run

# Type check
npm run typecheck

# Build production bundle
npm run build
```

The build output will be in the `dist/` directory.

## Deployment Options

### Option 1: Static Hosting (Recommended)

Deploy the `dist/` folder to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod --dir=dist`
- **AWS S3 + CloudFront**
- **GitHub Pages**

### Option 2: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass $BACKEND_URL;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Security Checklist

- [ ] HTTPS enabled on all endpoints
- [ ] CORS configured on backend for your domain only
- [ ] Rate limiting implemented on API endpoints
- [ ] Service account JSON keys stored securely (never in frontend)
- [ ] Webhook signing secret validation implemented
- [ ] CSP headers configured
- [ ] Input validation on backend (don't trust frontend validation alone)

## Monitoring & Logging

### Recommended Tools

- **Error Tracking**: Sentry, Bugsnag, or Rollbar
- **Analytics**: Google Analytics, Mixpanel, or Amplitude
- **Performance**: Web Vitals, Lighthouse CI

### Adding Sentry (Example)

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
});
```

## Health Checks

Add a health check endpoint to your backend:

```
GET /api/health
Response: { "status": "ok", "timestamp": "2024-01-01T00:00:00Z" }
```

## Rollback Procedure

1. Keep previous build artifacts
2. Use deployment platform's rollback feature, or
3. Re-deploy previous version from git tag

```bash
git checkout v1.0.0
npm install
npm run build
# Deploy dist/
```

## Performance Optimization

The production build already includes:

- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Gzip compression ready

Additional optimizations:

- Enable Brotli compression on your CDN
- Set appropriate cache headers (1 year for hashed assets)
- Use a CDN for global distribution

## Support

For issues, open a ticket at: https://github.com/Ashish-Luthra/Google-PlayStore-Integration/issues
