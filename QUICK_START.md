# ⚡ Quick Start Guide

> **For developers who already have Docker and Node.js installed**

---

## 🚀 **First Time Setup (5 minutes)**

```bash
# 1. Clone and navigate
git clone <repo-url>
cd Do-An-IS402

# 2. Backend Setup
cd is-web-project
cp .env.example .env
docker-compose up -d
docker-compose exec app composer install
docker-compose exec app php artisan jwt:secret
docker-compose exec app php artisan migrate
Get-Content database/esapp.sql | docker-compose exec -T db mysql -uroot -pdh28042005 esapp
docker-compose exec app php artisan optimize:clear

# 3. Frontend Setup
cd ../electronic-e-commerce
echo 'VITE_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
VITE_GOOGLE_REDIRECT_URI="http://localhost:5173/auth/callback"
VITE_BACKEND_API_URL="http://localhost:8000/api"' > .env
npm install
npm run dev

# ✅ Done! Visit http://localhost:5173
```

---

## 🔄 **Daily Use**

### **Start:**
```bash
# Terminal 1 - Backend
cd is-web-project
docker-compose up -d

# Terminal 2 - Frontend
cd electronic-e-commerce
npm run dev
```

### **Stop:**
```bash
# Frontend: Ctrl+C
# Backend:
cd is-web-project
docker-compose down
```

---

## 🔗 **Access Points**

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | - |
| Backend API | http://localhost:8000/api | - |
| phpMyAdmin | http://localhost:8080 | root / dh28042005 |
| MySQL (Workbench) | localhost:3307 | root / dh28042005 |

---

## 🆘 **Common Issues**

**500 Error?**
```bash
docker-compose exec app php artisan optimize:clear
docker-compose restart app
```

**Can't connect to database?**
```bash
docker-compose restart db
```

**Port conflict?**
- Change ports in `docker-compose.yml`
- Or stop the conflicting service

**Frontend not connecting?**
- Check `.env` has: `VITE_BACKEND_API_URL="http://localhost:8000/api"`
- Restart frontend after .env changes

---

## 📚 **Full Guide**

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete documentation.

---

**Happy Coding!** 🎉
