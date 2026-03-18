# 🚀 DEPLOYMENT GUIDE

## Pre-Deployment Checklist

### 1. Environment Variables
```bash
# Pastikan .env.local sudah ter-setup dengan:
- NEXTAUTH_SECRET (generate: openssl rand -base64 32)
- NEXTAUTH_URL (set ke domain Anda)
- GOOGLE_CLIENT_ID & CLIENT_SECRET
- MONGODB_URI (production database)
```

### 2. Security Headers
✅ Sudah ditambahkan di `next.config.ts`:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

### 3. Rate Limiting
✅ Sudah ditambahkan di `lib/rateLimit.ts`
- Gunakan di API routes untuk proteksi

### 4. Middleware Protection
✅ Sudah ada di `middleware.ts`:
- Protected routes
- Auto redirect

## Deployment Steps

### Option A: Vercel (Recommended)
1. Push code ke GitHub
2. Buka https://vercel.com
3. Klik "New Project"
4. Select repository
5. Add environment variables
6. Deploy

### Option B: Self-Hosted (VPS/Heroku)
1. Build aplikasi: `npm run build`
2. Start: `npm run start`
3. Pastikan Node.js v18+
4. Setup database MongoDB Atlas
5. Configure environment variables

## Post-Deployment

### 1. Monitoring
- Setup error tracking (Sentry)
- Monitor API response times
- Check database performance

### 2. Backups
- Enable MongoDB Atlas backups
- Setup automated backups

### 3. SSL/TLS
- Force HTTPS
- Setup SSL certificate

### 4. DNS
- Update DNS records
- Setup www redirect

## Security Considerations

### Rate Limiting
Endpoints critical:
- `/api/auth/*` - Max 5 requests per minute
- Login attempts - Max 5 attempts per hour
- General API - Max 100 requests per minute

### API Error Messages
❌ DON'T:
```json
{ "error": "User not found in database at line 42" }
```

✅ DO:
```json
{ "status": "error", "message": "Invalid credentials" }
```

### Database Backups
- Automated daily backups
- Test restore procedures
- Keep 30 days of backups

### Monitoring & Logging
- Log all auth attempts
- Monitor API errors
- Alert on suspicious activities

## Environment Variables Production

```
NEXTAUTH_SECRET=<generate-secure-key>
NEXTAUTH_URL=https://yourdomain.com
GOOGLE_CLIENT_ID=<production-client-id>
GOOGLE_CLIENT_SECRET=<production-client-secret>
MONGODB_URI=<production-mongodb-uri>
NODE_ENV=production
```

## Testing Pre-Deployment

```bash
# Build test
npm run build

# Lint check
npm run lint

# Start locally
npm run start
```

## Common Issues & Solutions

### 1. "Unauthorized" errors
- Check NEXTAUTH_SECRET is set
- Verify database connection

### 2. Google OAuth not working
- Check callback URL matches
- Verify client ID & secret

### 3. 502 Bad Gateway (Vercel/Self-hosted)
- Check database connection timeout
- Increase memory/resources

### 4. CORS errors
- Configure CORS in API routes if needed
- Check origin is whitelisted

## Monitoring Commands

```bash
# Check build size
npm run build -- --analyze

# Monitor logs (Vercel)
vercel logs <project-name>

# Check database connection
mongosh <MONGODB_URI>
```

---

**Status**: ✅ Ready for deployment after checklist completion
