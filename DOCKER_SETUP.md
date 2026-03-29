# 🚀 Docker Setup - Single Command

This project uses a **unified `docker-compose.yml`** at the root that orchestrates all services.

##  **What Changed?**

### ❌ **Old Way** (Two separate commands):
```bash
cd is-web-project
docker-compose up -d

cd ../electronic-e-commerce  
docker-compose up
```

### ✅ **New Way** (One command):
```bash
# From project root
docker-compose up -d
```
    // "predeploy:gate": "npm --prefix electronic-e-commerce run lint && npm --prefix electronic-e-commerce run build && npm --prefix electronic-e-commerce run test:run && cd is-web-project && php vendor/bin/pint --test app bootstrap/app.php config database routes tests && php artisan config:clear && php artisan test && php artisan optimize"

## 📦 **What Runs?**

One command starts **4 containers**:

| Container | Service | Port | Description |
|-----------|---------|------|-------------|
| `ecommerce-frontend` | React + Vite | 5173 | Frontend development server |
| `ecommerce-backend` | Laravel PHP | - | Backend application |
| `ecommerce-nginx` | Nginx | 8000 | Web server for Laravel |
| `ecommerce-db` | MySQL 8.0 | 3307 | Database |

## 🎯 **Quick Commands**

All from project root:

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f frontend
docker-compose logs -f backend

# Check status
docker-compose ps

# Restart specific service
docker-compose restart frontend
docker-compose restart backend

# Run backend commands
docker-compose exec backend php artisan migrate
docker-compose exec backend composer install

# Run frontend commands
docker-compose exec frontend npm install
```

## 🌐 **Network**

All containers share the `ecommerce-network`:
- Frontend can reach backend via service name
- Services communicate internally
- Ports are only exposed to host where needed

## 💾 **Data Persistence**

- **Database:** Stored in Docker volume `dbdata` (survives restarts)
- **node_modules:** Anonymous volume (survives restarts)
- **Code:** Mounted from host (live updates)

## 💡 **Tips & Best Practices**

### **Importing SQL Files**

**Best method** (avoids encoding issues):
```bash
# Copy SQL file into container first
docker cp is-web-project/database/esapp.sql ecommerce-db:/tmp/esapp.sql

# Then import inside container
docker-compose exec db bash -c "mysql -uroot -pdh28042005 esapp < /tmp/esapp.sql"
```

Why this method?
- ✅ Avoids PowerShell encoding issues
- ✅ Preserves UTF-8 characters
- ✅ Works consistently on Windows/Mac/Linux
- ✅ Faster for large SQL files

### **Viewing Logs by Service**
```bash
docker-compose logs -f frontend   # React/Vite logs
docker-compose logs -f backend    # PHP-FPM logs
docker-compose logs -f nginx      # Web server logs
docker-compose logs -f db         # MySQL logs
```

## 📋 **Benefits**

✅ **Simpler** - One command to start everything  
✅ **Faster** - No switching directories  
✅ **Cleaner** - Shared network automatically configured  
✅ **Better** - Industry-standard monorepo Docker setup  
✅ **Easier** - Manage all services together

## 🔄 **Migration from Old Setup**

If you have containers from the old setup running:

```bash
# Stop old containers
cd is-web-project && docker-compose down
cd ../electronic-e-commerce && docker-compose down

# Start new unified setup from root
cd .. # back to Do-An-IS402
docker-compose up -d
```

Your data is preserved! The database volume is reused.

---

**See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete documentation.**
