# 🚀 Complete Setup Guide - E-Commerce Project

> **Complete guide to run this Laravel + React e-commerce application on a fresh machine**

---

## 📋 **Prerequisites**

Before starting, ensure you have these installed:

### **Required Software:**
- ✅ **Docker Desktop** (for Windows/Mac) - [Download here](https://www.docker.com/products/docker-desktop)
- ✅ **Node.js** (v20.19+ or v22.12+) - [Download here](https://nodejs.org/)
- ✅ **npm** (comes with Node.js)
- ✅ **Git** (for cloning) - [Download here](https://git-scm.com/)

### **Optional (Recommended):**
- 🔧 **MySQL Workbench** - for database management
- 🔧 **VS Code** - recommended code editor

---

## 🎯 **Quick Start (TL;DR)**

```bash
# 1. Clone the repository
git clone <repository-url>
cd Do-An-IS402

# 2. Backend Setup
cd is-web-project
cp .env.example .env
docker-compose up -d
docker-compose exec app composer install
docker-compose exec app php artisan jwt:secret
docker-compose exec app php artisan migrate
Get-Content database/esapp.sql | docker-compose exec -T db mysql -uroot -pdh28042005 esapp

# 3. Frontend Setup
cd ../electronic-e-commerce
npm install
npm run dev

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

### **STEP 2: Backend Setup (Laravel + Docker)**

#### **2.1 Navigate to Backend Folder**
```bash
cd is-web-project
```

#### **2.2 Create Environment File**
```bash
# Copy the example environment file
cp .env.example .env
```

#### **2.3 Configure .env File**
Open `.env` and ensure these settings:

```env
APP_NAME=esapp
APP_ENV=local
APP_KEY=base64:KRz3jXPYdm8gjYF4qUGqtjO/bx8m/s2CRCkDPqspvqE=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=esapp
DB_USERNAME=root
DB_PASSWORD=dh28042005

CACHE_STORE=file
SESSION_DRIVER=file
QUEUE_CONNECTION=database

MAIL_MAILER=log
MAIL_FROM_ADDRESS="hello@example.com"

JWT_SECRET=  # Will be generated in next step
```

#### **2.4 Start Docker Desktop**
- Open Docker Desktop application
- Wait until it's fully running (whale icon stops animating)

#### **2.5 Build and Start Containers**
```bash
docker-compose up -d
```

⏱️ **First build takes 5-10 minutes** (downloads images and builds PHP container)

Containers that will start:
- `laravel_app` - PHP/Laravel application
- `laravel_nginx` - Web server (port 8000)
- `laravel_db` - MySQL database (port 3307)
- `laravel_phpmyadmin` - Database management UI (port 8080)

#### **2.6 Install PHP Dependencies**
```bash
docker-compose exec app composer install
```

#### **2.7 Generate JWT Secret Key**
```bash
docker-compose exec app php artisan jwt:secret
```

#### **2.8 Run Database Migrations**
```bash
docker-compose exec app php artisan migrate
```

#### **2.9 Import Sample Data**

**For PowerShell (Windows):**
```powershell
Get-Content database/esapp.sql | docker-compose exec -T db mysql -uroot -pdh28042005 esapp
```

**For Bash (Mac/Linux):**
```bash
docker-compose exec -T db mysql -uroot -pdh28042005 esapp < database/esapp.sql
```

#### **2.10 Set Permissions (if needed)**
```bash
docker-compose exec app chmod -R 777 storage bootstrap/cache
```

#### **2.11 Clear Caches**
```bash
docker-compose exec app php artisan optimize:clear
```

✅ **Backend is ready at: http://localhost:8000**

---

### **STEP 3: Frontend Setup (React + Vite)**

#### **3.1 Navigate to Frontend Folder**
```bash
cd ../electronic-e-commerce
```

#### **3.2 Create Environment File**
Create a `.env` file with:

```env
VITE_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
VITE_GOOGLE_REDIRECT_URI="http://localhost:5173/auth/callback"
VITE_BACKEND_API_URL="http://localhost:8000/api"
```

#### **3.3 Install Dependencies**
```bash
npm install
```

⏱️ **Takes 2-5 minutes depending on internet speed**

#### **3.4 Start Development Server**
```bash
npm run dev
```

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
- Press `Ctrl + C` in the terminal running `npm run dev`

### **Stop Backend:**
```bash
cd is-web-project
docker-compose down
```

**Note:** Your database data is preserved in Docker volumes and won't be lost.

---

## ▶️ **Restarting the Project**

### **Next Time You Want to Run:**

**1. Start Backend:**
```bash
cd is-web-project
docker-compose up -d
```
⏱️ Takes ~10-30 seconds (much faster after first build)

**2. Start Frontend:**
```bash
cd electronic-e-commerce
npm run dev
```

That's it! No need to reinstall or reconfigure.

---

## 🔧 **Useful Commands**

### **Docker Commands:**
```bash
# View container status
docker-compose ps

# View logs
docker-compose logs -f app
docker-compose logs -f nginx
docker-compose logs -f db

# Restart a specific service
docker-compose restart app
docker-compose restart nginx

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
docker-compose exec app php artisan <command>

# Examples:
docker-compose exec app php artisan route:list
docker-compose exec app php artisan migrate:status
docker-compose exec app php artisan config:clear
docker-compose exec app php artisan cache:clear
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

**Backend (.env):**
```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:5173/auth/callback
```

**Frontend (.env):**
```env
VITE_GOOGLE_CLIENT_ID="your-client-id-here"
VITE_GOOGLE_REDIRECT_URI="http://localhost:5173/auth/callback"
```

### **3. Restart Services:**
```bash
# Restart backend
docker-compose restart app

# Restart frontend (Ctrl+C, then npm run dev)
```

---

## 🐛 **Troubleshooting**

### **Problem: Docker port already in use**
```bash
# Check what's using the port
netstat -ano | findstr :8000
netstat -ano | findstr :3306

# Stop conflicting service or change port in docker-compose.yml
```

### **Problem: Permission denied errors**
```bash
# Fix Laravel storage permissions
docker-compose exec app chmod -R 777 storage bootstrap/cache
```

### **Problem: 500 Internal Server Error**
```bash
# Check logs
docker-compose logs -f app

# Clear all caches
docker-compose exec app php artisan optimize:clear
docker-compose exec app php artisan config:clear
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
# (Ctrl+C, then npm run dev)
```

### **Problem: JWT token errors**
```bash
# Regenerate JWT secret
docker-compose exec app php artisan jwt:secret

# Clear config
docker-compose exec app php artisan config:clear

# Restart app
docker-compose restart app
```

### **Problem: npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and try again
rm -rf node_modules package-lock.json
npm install
```

### **Problem: Port 5173 already in use**
Vite will automatically try the next available port (5174, 5175, etc.)
Update your Google OAuth redirect URI if port changes.

---

## 📁 **Project Structure**

```
Do-An-IS402/
├── electronic-e-commerce/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   ├── pages/                 # Page components
│   │   ├── lib/                   # API and utilities
│   │   ├── context/               # React context
│   │   └── App.jsx               # Main app component
│   ├── public/                    # Static assets
│   ├── package.json
│   └── .env                       # Frontend environment
│
└── is-web-project/                 # Backend (Laravel)
    ├── app/
    │   ├── Http/Controllers/      # API controllers
    │   ├── Models/                # Database models
    │   ├── Repositories/          # Data repositories
    │   └── Middleware/            # Custom middleware
    ├── database/
    │   ├── migrations/            # Database migrations
    │   ├── seeders/               # Database seeders
    │   └── esapp.sql             # Sample data
    ├── routes/
    │   └── api.php               # API routes
    ├── docker-compose.yml         # Docker configuration
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
2. `cd is-web-project && docker-compose up -d`
3. `cd ../electronic-e-commerce && npm run dev`
4. Code away! ✨
5. Stop: Ctrl+C frontend, `docker-compose down` backend

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
4. ✅ Use `npm run build` for frontend
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
- **Node.js:** 20.12.0+ (20.19+ or 22.12+ recommended)
- **MySQL:** 8.0
- **PHP:** 8.x (via Docker)
- **nginx:** Alpine (via Docker)

---

## ✅ **Checklist for Fresh Setup**

- [ ] Docker Desktop installed and running
- [ ] Node.js installed (v20.19+ or v22.12+)
- [ ] Repository cloned
- [ ] Backend .env configured
- [ ] Docker containers running (`docker-compose ps`)
- [ ] PHP dependencies installed
- [ ] JWT secret generated
- [ ] Database migrated
- [ ] Sample data imported
- [ ] Frontend .env configured
- [ ] npm dependencies installed
- [ ] Frontend dev server running
- [ ] Can access http://localhost:5173
- [ ] Can browse products
- [ ] Can sign up/login

---

## 🎉 **You're All Set!**

Your e-commerce application is now running locally. Start developing and enjoy! 🚀

For questions or issues, check the Troubleshooting section above.

**Happy Coding!** 💻✨
