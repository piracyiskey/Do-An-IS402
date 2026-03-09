# 🚀 Complete Setup Guide - E-Commerce Project

> **Complete guide to run this Laravel + React e-commerce application on a fresh machine**

---

## 📋 **Prerequisites**

Before starting, ensure you have these installed:

### **Required Software:**
- ✅ **Docker Desktop** (for Windows/Mac) - [Download here](https://www.docker.com/products/docker-desktop)
- ✅ **Git** (for cloning) - [Download here](https://git-scm.com/)

### **Optional (Recommended):**
- 🔧 **MySQL Workbench** - for database management
- 🔧 **VS Code** - recommended code editor

**Note:** Node.js and npm are no longer required on your machine - Docker handles all dependencies!

---

## 🎯 **Quick Start (TL;DR)**

```bash
# 1. Clone the repository
git clone <repository-url>
cd Do-An-IS402

# 2. Setup environment files
cp is-web-project/.env.example is-web-project/.env
cp electronic-e-commerce/.env.example electronic-e-commerce/.env

# 3. Start all services (one command!)
docker-compose up -d

# 4. Setup backend
docker-compose exec backend composer install
docker-compose exec backend php artisan jwt:secret
docker-compose exec backend php artisan migrate
docker cp is-web-project/database/esapp.sql $(docker-compose ps -q db | Select-Object -First 1):/tmp/esapp.sql
docker-compose exec db bash -c "mysql -uroot -pdh28042005 esapp < /tmp/esapp.sql"

# Done! Visit http://localhost:5173
```

---

## 📖 **Detailed Step-by-Step Guide**

### **STEP 1: Clone the Project**

```bash
git clone <your-repository-url>
cd Do-An-IS402
```

---

### **STEP 2: Setup Environment Files**

#### **2.1 Backend Environment**
```bash
cp is-web-project/.env.example is-web-project/.env
```

The `.env.example` has sensible defaults. You can edit `is-web-project/.env` later if needed.

#### **2.2 Frontend Environment**
```bash
cp electronic-e-commerce/.env.example electronic-e-commerce/.env
```

Default values work out-of-the-box. Only update `VITE_GOOGLE_CLIENT_ID` if you want Google OAuth.

---

### **STEP 3: Start All Services**

#### **3.1 Ensure Docker Desktop is Running**
- Open Docker Desktop application
- Wait until it's fully running (whale icon stops animating)

#### **3.2 Start All Containers (One Command!)**
```bash
docker-compose up -d
```

⏱️ **First build takes 5-10 minutes** (downloads images and builds containers)

This single command starts **all services**:
- `frontend` - React + Vite dev server (port 5173)
- `backend` - PHP/Laravel application
- `nginx` - Web server (port 8000)
- `db` - MySQL 8.0 database (port 3307)
- `phpmyadmin` - Database management UI (port 8080)

**Verify all containers are running:**
```bash
docker-compose ps
```

---

### **STEP 4: Setup Backend**

All commands run from the project root:

#### **4.1 Install PHP Dependencies**
```bash
docker-compose exec backend composer install
```

#### **4.2 Generate JWT Secret Key**
```bash
docker-compose exec backend php artisan jwt:secret
```

#### **4.3 Run Database Migrations**
```bash
docker-compose exec backend php artisan migrate
```

#### **4.4 Import Sample Data**

This method copies the SQL file into the container first, then imports it. This avoids encoding issues with PowerShell and works consistently across all platforms.

**For PowerShell (Windows):**
```powershell
docker cp is-web-project/database/esapp.sql ecommerce-db:/tmp/esapp.sql
docker-compose exec db bash -c "mysql -uroot -pdh28042005 esapp < /tmp/esapp.sql"
```

**For Bash (Mac/Linux):**
```bash
docker cp is-web-project/database/esapp.sql ecommerce-db:/tmp/esapp.sql
docker-compose exec db bash -c "mysql -uroot -pdh28042005 esapp < /tmp/esapp.sql"
```

**Alternative (Bash only - direct pipe):**
```bash
docker-compose exec -T db mysql -uroot -pdh28042005 esapp < is-web-project/database/esapp.sql
```

#### **4.5 Set Permissions (if needed)**
```bash
docker-compose exec backend chmod -R 777 storage bootstrap/cache
```

#### **4.6 Clear Caches**
```bash
docker-compose exec backend php artisan optimize:clear
```

✅ **Backend is ready at: http://localhost:8000**

---

### **STEP 5: Verify Everything Works**

The frontend container automatically installs dependencies and starts when you ran `docker-compose up`.

✅ **Frontend is ready at: http://localhost:5173**

---

## 🎉 **Verification**

Open your browser and verify all services:

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | - |
| **Backend API** | http://localhost:8000/api | - |
| **phpMyAdmin** | http://localhost:8080 | root / dh28042005 |

### **Test the Application:**
1. Open http://localhost:5173
2. Browse products (60 Samsung products available)
3. Try signing up for a new account
4. Try logging in
5. Add items to cart

---

## 📊 **Database Information**

### **Pre-loaded Data:**
- **60 Products** - Samsung smartphones, tablets, laptops, TVs
- **19 Categories** - Mobile, TV & AV, Computing, etc.
- **2 Test Users** - Check phpMyAdmin for credentials
- **1 Brand** - Samsung

### **Database Connection (MySQL Workbench):**
```
Hostname: 127.0.0.1
Port: 3307
Username: root
Password: dh28042005
Database: esapp
```

**Note:** Port 3307 is used to avoid conflicts with local MySQL installations.

---

## 🛑 **Stopping the Project**

### **Stop Frontend:**
## 🛑 **Stopping the Project**

From the project root:

```bash
# Stop all services
docker-compose down

# Or stop without removing containers (faster restart):
docker-compose stop
```

**Note:** Your data (database & node_modules) is preserved in Docker volumes and won't be lost.

---

## ▶️ **Restarting the Project**

### **Next Time You Want to Run:**

From the project root:

```bash
# Start all services
docker-compose up -d
```

⏱️ Takes ~10-30 seconds (much faster after first build)

That's it! No need to reinstall or reconfigure.

**Tip:** Remove `-d` to see logs in foreground: `docker-compose up`

---

## 🔧 **Useful Commands**

All commands run from the project root:

### **Docker Commands:**
```bash
# View all container status
docker-compose ps

# View logs (all services)
docker-compose logs -f

# View logs for specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f nginx
docker-compose logs -f db

# Restart specific service
docker-compose restart frontend
docker-compose restart backend
docker-compose restart nginx
docker-compose restart db

# Stop without removing containers (faster restart)
docker-compose stop

# Start stopped containers
docker-compose start

# Remove everything (including volumes - DELETES DATA!)
docker-compose down -v
```

### **Laravel Commands:**
```bash
# Run any artisan command
docker-compose exec backend php artisan <command>

# Examples:
docker-compose exec backend php artisan route:list
docker-compose exec backend php artisan migrate:status
docker-compose exec backend php artisan config:clear
docker-compose exec backend php artisan cache:clear
```

### **Database Commands:**
```bash
# Access MySQL CLI
docker-compose exec db mysql -uroot -pdh28042005 esapp

# Run SQL query
docker-compose exec -T db mysql -uroot -pdh28042005 esapp -e "SELECT * FROM users;"

# Backup database
docker-compose exec db mysqldump -uroot -pdh28042005 esapp > backup.sql

# Restore database
Get-Content backup.sql | docker-compose exec -T db mysql -uroot -pdh28042005 esapp
```

### **Frontend Docker Commands:**
```bash
# Navigate to frontend directory first
cd electronic-e-commerce

### **Frontend Commands:**
```bash
# View frontend container status
docker-compose ps frontend

# View frontend logs (live)
docker-compose logs -f frontend

# Restart frontend
docker-compose restart frontend

# Rebuild frontend after package.json changes
docker-compose build frontend
docker-compose up -d frontend

# Access container shell (for debugging)
docker-compose exec frontend sh

# Run npm commands inside container
docker-compose exec frontend npm install <package-name>
docker-compose exec frontend npm list

# Clean rebuild
docker-compose down
docker-compose build --no-cache frontend
docker-compose up -d
```

---

## ⚙️ **Google OAuth Setup (Optional)**

If you want to enable Google Sign-In:

### **1. Create Google OAuth Credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Navigate to: **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen if needed
6. Set Application type: **Web application**
7. Add Authorized redirect URI:
   ```
   http://localhost:5173/auth/callback
   ```
8. Copy the **Client ID** and **Client Secret**

### **2. Update Environment Files:**

**Backend (is-web-project/.env):**
```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:5173/auth/callback
```

**Frontend (electronic-e-commerce/.env):**
```env
VITE_GOOGLE_CLIENT_ID="your-client-id-here"
VITE_GOOGLE_REDIRECT_URI="http://localhost:5173/auth/callback"
```

### **3. Restart Services:**
```bash
# From project root
docker-compose restart backend
docker-compose restart frontend
```

---

## 🐛 **Troubleshooting**

All commands run from the project root:

### **Problem: Docker port already in use**
```bash
# Check what's using the port
netstat -ano | findstr :8000
netstat -ano | findstr :3306

# Stop conflicting service or change port in root docker-compose.yml
```

### **Problem: Permission denied errors**
```bash
# Fix Laravel storage permissions
docker-compose exec backend chmod -R 777 storage bootstrap/cache
```

### **Problem: 500 Internal Server Error**
```bash
# Check logs
docker-compose logs -f backend

# Clear all caches
docker-compose exec backend php artisan optimize:clear
docker-compose exec backend php artisan config:clear
```

### **Problem: Database connection refused**
```bash
# Make sure containers are running
docker-compose ps

# Check if DB is healthy
docker-compose logs db

# Restart database
docker-compose restart db
```

### **Problem: Frontend can't connect to backend**
```bash
# Verify .env has correct API URL
# Should be: VITE_BACKEND_API_URL="http://localhost:8000/api"

# Restart frontend after .env changes
cd electronic-e-commerce
### **Problem: Database connection refused**
```bash
# Make sure containers are running
docker-compose ps

# Check if DB is healthy
docker-compose logs db

# Restart database
docker-compose restart db
```

### **Problem: Frontend can't connect to backend**
```bash
# Verify electronic-e-commerce/.env has correct API URL
# Should be: VITE_BACKEND_API_URL="http://localhost:8000/api"

# Restart frontend after .env changes
docker-compose restart frontend
```

### **Problem: JWT token errors**
```bash
# Regenerate JWT secret
docker-compose exec backend php artisan jwt:secret

# Clear config
docker-compose exec backend php artisan config:clear

# Restart backend
docker-compose restart backend
```

### **Problem: npm/dependency issues**
```bash
# Rebuild frontend Docker image without cache
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

### **Problem: Port 5173 already in use**
```bash
# Stop the container using the port
docker-compose stop frontend

# Or change the port in root docker-compose.yml:
# ports:
#   - "8080:5173"  # Use 8080 instead
# Then restart and update Google OAuth redirect URI accordingly
```

---

## 📁 **Project Structure**

```
Do-An-IS402/
├── docker-compose.yml              # 🆕 ROOT - Orchestrates all services!
├── electronic-e-commerce/          # Frontend (React + Vite + Docker)
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   ├── pages/                 # Page components
│   │   ├── lib/                   # API and utilities
│   │   ├── context/               # React context
│   │   └── App.jsx               # Main app component
│   ├── public/                    # Static assets
│   ├── Dockerfile                 # Frontend Docker configuration
│   ├── nginx.conf                 # Nginx config (production)
│   ├── package.json
│   └── .env                       # Frontend environment
│
└── is-web-project/                 # Backend (Laravel + Docker)
    ├── app/
    │   ├── Http/Controllers/      # API controllers
    │   ├── Models/                # Database models
    │   ├── Repositories/          # Data repositories
    │   └── Middleware/            # Custom middleware
    ├── database/
    │   ├── migrations/            # Database migrations
    │   ├── seeders/               # Database seeders
    │   └── esapp.sql             # Sample data
    ├── docker/
    │   ├── php/Dockerfile         # PHP container config
    │   └── nginx/                 # Nginx config
    ├── routes/
    │   └── api.php               # API routes
    └── .env                       # Backend environment
```

---

## 🎓 **Features Included**

✅ User Authentication (JWT)
✅ Google OAuth Sign-In
✅ Product Catalog (60 products)
✅ Category Management (19 categories)
✅ Shopping Cart
✅ Order Management
✅ Admin Dashboard
✅ Email Verification (logged)
✅ User Profiles
✅ Rewards System
✅ Promotions/Coupons
✅ phpMyAdmin Interface

---

## 📞 **Support & Resources**

- **Backend Framework:** [Laravel Documentation](https://laravel.com/docs)
- **Frontend Framework:** [React Documentation](https://react.dev)
- **Build Tool:** [Vite Documentation](https://vitejs.dev)
- **Docker:** [Docker Documentation](https://docs.docker.com)

---

## 🎯 **Development Workflow**

### **Daily Development:**
1. Start Docker Desktop
2. From project root: `docker-compose up -d`
3. Code away! ✨ (Hot reload enabled for both frontend and backend)
4. View logs: `docker-compose logs -f` (optional)
5. Stop: `docker-compose down`

**That's it - one command to start everything!**

### **Before Committing:**
```bash
# Don't commit .env files (already in .gitignore)
git status

# Check what you're committing
git diff

# Commit changes
git add .
git commit -m "Your message"
git push
```

---

## 🌟 **Production Deployment Tips**

Before deploying to production:

1. ✅ Change all passwords and secrets
2. ✅ Set `APP_DEBUG=false` in backend .env
3. ✅ Enable real SMTP for emails (not log)
4. ✅ Build optimized frontend: `docker build --target production`
5. ✅ Set up SSL certificates (HTTPS)
6. ✅ Configure CORS properly
7. ✅ Set up proper database backups
8. ✅ Use environment-specific .env files
9. ✅ Enable Laravel caching in production
10. ✅ Set up monitoring and error tracking

---

## 📝 **Version Information**

- **Laravel:** Latest
- **React:** 19.1.1
- **Node.js:** 20-alpine (via Docker)
- **MySQL:** 8.0 (via Docker)
- **PHP:** 8.x (via Docker)
- **nginx:** Alpine (via Docker - for production)
- **Vite:** 7.1.7

---

## ✅ **Checklist for Fresh Setup**

- [ ] Docker Desktop installed and running
- [ ] Repository cloned
- [ ] Backend .env configured
- [ ] Backend Docker containers running (`docker-compose ps`)
- [ ] PHP dependencies installed
- [ ] JWT secret generated
- [ ] Database migrated
- [ ] Sample data imported
- [ ] Frontend .env configured
- [ ] Frontend Docker container running
- [ ] Can access http://localhost:5173
- [ ] Can browse products
- [ ] Can sign up/login

---

## 🎉 **You're All Set!**

Your e-commerce application is now running locally. Start developing and enjoy! 🚀

For questions or issues, check the Troubleshooting section above.

**Happy Coding!** 💻✨
