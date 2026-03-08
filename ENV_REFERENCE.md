# 🔐 Environment Variables Reference

Complete reference for all environment variables used in this project.

---

## 📦 **Backend (.env) - Laravel**

Location: `is-web-project/.env`

### **Application Settings**
```env
APP_NAME=esapp
APP_ENV=local                          # local, production, staging
APP_KEY=base64:...                     # Auto-generated
APP_DEBUG=true                         # Set to false in production
APP_URL=http://localhost:8000
```

### **Database Configuration**
```env
DB_CONNECTION=mysql
DB_HOST=db                             # Use "db" for Docker, "127.0.0.1" for local
DB_PORT=3306                           # Internal port (3307 externally)
DB_DATABASE=esapp
DB_USERNAME=root
DB_PASSWORD=dh28042005
```

### **Cache & Session**
```env
CACHE_STORE=file                       # file, redis, database
SESSION_DRIVER=file                    # file, cookie, database, redis
SESSION_LIFETIME=120
```

### **Mail Configuration**
```env
MAIL_MAILER=log                        # log, smtp, sendmail, mailgun
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

**For Production (Gmail SMTP):**
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password       # Generate at myaccount.google.com
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="your-email@gmail.com"
```

### **JWT Authentication**
```env
JWT_SECRET=                            # Run: php artisan jwt:secret
JWT_ALGO=HS256
```

### **Google OAuth**
```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:5173/auth/callback
```

**To get your own:**
1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add redirect URI: `http://localhost:5173/auth/callback`

---

## ⚛️ **Frontend (.env) - React**

Location: `electronic-e-commerce/.env`

### **API Configuration**
```env
VITE_BACKEND_API_URL="http://localhost:8000/api"
```

### **Google OAuth**
```env
VITE_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
VITE_GOOGLE_REDIRECT_URI="http://localhost:5173/auth/callback"
```

**Important:** 
- All Vite env vars must start with `VITE_`
- Changes require frontend restart
- Must match backend Google OAuth settings

---

## 🔄 **Environment-Specific Configs**

### **Development (Current)**
```env
Backend:  http://localhost:8000
Frontend: http://localhost:5173
Database: localhost:3307
Debug:    Enabled
Mail:     Logged (not sent)
```

### **Production (Recommended)**
```env
Backend:  https://api.yourdomain.com
Frontend: https://yourdomain.com
Database: Remote secure host
Debug:    Disabled
Mail:     Real SMTP (Gmail/SendGrid)
HTTPS:    Required
CORS:     Specific origins only
```

---

## 🚨 **Security Notes**

### **Never Commit These:**
- ❌ `.env` files
- ❌ `JWT_SECRET`
- ❌ Database passwords
- ❌ Google OAuth secrets
- ❌ API keys

### **Files Already in .gitignore:**
- ✅ `is-web-project/.env`
- ✅ `electronic-e-commerce/.env`

### **Before Production:**
1. Change all passwords
2. Generate new JWT secret
3. Use strong, unique passwords
4. Enable HTTPS
5. Set `APP_DEBUG=false`
6. Use environment-specific .env files
7. Set up proper CORS

---

## 📝 **Generating Secure Values**

### **APP_KEY (Laravel)**
```bash
docker-compose exec app php artisan key:generate
```

### **JWT_SECRET**
```bash
docker-compose exec app php artisan jwt:secret
```

### **Random String (for passwords)**
```bash
# Linux/Mac
openssl rand -base64 32

# PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

---

## 🔍 **Troubleshooting**

### **Changes Not Applying?**

**Backend:**
```bash
docker-compose restart app
docker-compose exec app php artisan config:clear
```

**Frontend:**
```bash
# Stop (Ctrl+C) and restart
npm run dev
```

### **Check Current Config:**

**Backend:**
```bash
docker-compose exec app php artisan config:show
docker-compose exec app php artisan env
```

**Frontend:**
- Open browser console
- Type: `import.meta.env`

---

## 📋 **Quick Reference**

| Variable | Location | Purpose |
|----------|----------|---------|
| `APP_KEY` | Backend | Laravel encryption key |
| `JWT_SECRET` | Backend | JWT token signing |
| `DB_PASSWORD` | Backend | Database password |
| `GOOGLE_CLIENT_ID` | Both | OAuth authentication |
| `VITE_BACKEND_API_URL` | Frontend | API endpoint |

---

## ✅ **Validation Checklist**

- [ ] Backend `.env` exists and configured
- [ ] Frontend `.env` exists and configured
- [ ] JWT secret generated
- [ ] Database credentials match
- [ ] Google Client IDs match in both files
- [ ] API URL points to correct backend
- [ ] Redirect URIs match in Google Console
- [ ] Mail configuration set (log or SMTP)

---

**Need help?** Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.
