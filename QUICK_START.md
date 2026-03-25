# ⚡ Quick Start Guide

> **For developers who already have Docker installed**

---

## 🚀 **First Time Setup (5 minutes)**

```bash
# 1. Clone and navigate
git clone https://github.com/piracyiskey/Do-An-IS402.git
cd Do-An-IS402

# 2. Setup environment files
cp is-web-project/.env.example is-web-project/.env
cp electronic-e-commerce/.env.example electronic-e-commerce/.env

# 3. Pull secrets from Azure Key Vault into local untracked file
# (requires az login first)
.\scripts\pull-secrets.ps1 -VaultName "kv-esapp-local"

# 4. Start all services (one command!)
docker compose --env-file .secrets.local.env up -d --build

# 5. Setup backend
docker compose exec backend composer install
docker compose exec backend php artisan migrate
docker cp is-web-project/database/esapp.sql ecommerce-db:/tmp/esapp.sql
docker compose exec db bash -c "mysql -uroot -p\"$MYSQL_ROOT_PASSWORD\" esapp < /tmp/esapp.sql"
docker compose exec backend php artisan optimize:clear

# ✅ Done! Visit http://localhost:5173
```

---

## 🔄 **Daily Use**

### **Start:**
```bash
# From project root - ONE command starts everything!
docker compose --env-file .secrets.local.env up

# Or run in background:
docker compose --env-file .secrets.local.env up -d
```

### **Stop:**
```bash
# From project root
docker compose down

# Stop without removing containers (faster restart):
docker compose stop
```

`docker compose down` is enough to turn everything off.

---

## 🔗 **Access Points**

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | - |
| Backend API | http://localhost:8000/api | - |
| MySQL (Workbench) | localhost:3307 | root / value from `.secrets.local.env` (`MYSQL_ROOT_PASSWORD`) |

---

## 🆘 **Common Issues**

**500 Error?**
```bash
docker compose exec backend php artisan optimize:clear
docker compose restart backend
```

**Can't connect to database?**
```bash
docker compose restart db
```

**Port conflict?**
- Change ports in root `docker-compose.yml`
- Or stop the conflicting service

**Frontend not connecting to backend?**
```bash
# Check electronic-e-commerce/.env has: VITE_BACKEND_API_URL="http://localhost:8000/api"
docker compose restart frontend
```

**Container issues?**
```bash
docker compose down
docker compose build --no-cache
docker compose --env-file .secrets.local.env up -d
```

---


---

**Happy Coding!** 🎉
