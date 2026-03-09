# ⚡ Quick Start Guide

> **For developers who already have Docker installed**

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
Get-Content database/esapp.sql -Encoding UTF8 | docker-compose exec -T db mysql -uroot -pdh28042005 esapp
docker-compose exec app php artisan optimize:clear

# 3. Frontend Setup
cd ../electronic-e-commerce
cp .env.example .env
# Optional: Edit .env to add your Google Client ID
docker-compose up

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
docker-compose up
```

### **Stop:**
```bash
# Frontend: Ctrl+C in terminal, then:
cd electronic-e-commerce
docker-compose down

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
cd is-web-project
docker-compose exec app php artisan optimize:clear
docker-compose restart app
```

**Can't connect to database?**
```bash
cd is-web-project
docker-compose restart db
```

**Port conflict?**
- Change ports in `docker-compose.yml` (in respective folder)
- Or stop the conflicting service

**Frontend not connecting to backend?**
```bash
# Check .env has: VITE_BACKEND_API_URL="http://localhost:8000/api"
cd electronic-e-commerce
docker-compose restart
```

**Frontend container issues?**
```bash
cd electronic-e-commerce
docker-compose down
docker-compose build --no-cache
docker-compose up
```

---

## 📚 **Full Guide**

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete documentation.

---

**Happy Coding!** 🎉
