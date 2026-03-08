# 📚 Documentation Index

Complete documentation for the Samsung E-Commerce Platform.

---

## 🎯 **Choose Your Guide**

### **👋 New to the Project?**
Start here: **[README.md](./README.md)** - Project overview

### **🚀 Want to Get Started Fast?**
Use: **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup

### **📖 Need Detailed Instructions?**
Read: **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete guide with troubleshooting

### **🔐 Configuring Environment Variables?**
Check: **[ENV_REFERENCE.md](./ENV_REFERENCE.md)** - All environment variables explained

### **🔑 Setting up Google Sign-In?**
See: **[GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)** - OAuth configuration

---

## 📂 **Documentation Files**

| File | Purpose | For Who |
|------|---------|---------|
| **README.md** | Project overview | Everyone |
| **QUICK_START.md** | Fast setup commands | Experienced devs |
| **SETUP_GUIDE.md** | Complete setup guide | Beginners |
| **ENV_REFERENCE.md** | Environment variables | Configurers |
| **GOOGLE_OAUTH_SETUP.md** | OAuth setup | Feature enablers |
| **DOCS_INDEX.md** | This file | Navigation |

---

## 🎓 **Learning Path**

### **First Time Setup:**
1. Read [README.md](./README.md) - Understand the project
2. Follow [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Set up everything
3. Reference [ENV_REFERENCE.md](./ENV_REFERENCE.md) - Configure properly
4. Optional: [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) - Enable Google login

### **Returning Developer:**
1. Use [QUICK_START.md](./QUICK_START.md) - Start quickly
2. Check [ENV_REFERENCE.md](./ENV_REFERENCE.md) if needed

### **Troubleshooting:**
1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md#troubleshooting) - Common issues
2. Review [QUICK_START.md](./QUICK_START.md#common-issues) - Quick fixes

---

## 🔍 **Quick Solutions**

### **Can't connect to database?**
```bash
docker-compose restart db
docker-compose ps
```
Details: [SETUP_GUIDE.md](./SETUP_GUIDE.md#problem-database-connection-refused)

### **500 Server Error?**
```bash
docker-compose exec app php artisan optimize:clear
docker-compose restart app
```
Details: [SETUP_GUIDE.md](./SETUP_GUIDE.md#problem-500-internal-server-error)

### **Frontend not connecting?**
Check `.env` file:
```env
VITE_BACKEND_API_URL="http://localhost:8000/api"
```
Details: [ENV_REFERENCE.md](./ENV_REFERENCE.md#frontend-env---react)

### **Google OAuth not working?**
See: [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)

---

## 🌐 **URLs & Ports**

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | - |
| Backend API | http://localhost:8000/api | - |
| phpMyAdmin | http://localhost:8080 | root / dh28042005 |
| MySQL | localhost:3307 | root / dh28042005 |

---

## 🛠️ **Essential Commands**

### **Start Project:**
```bash
cd is-web-project && docker-compose up -d
cd ../electronic-e-commerce && npm run dev
```

### **Stop Project:**
```bash
# Frontend: Ctrl+C
cd is-web-project && docker-compose down
```

### **Clear Caches:**
```bash
docker-compose exec app php artisan optimize:clear
```

### **View Logs:**
```bash
docker-compose logs -f app
```

Full command reference: [SETUP_GUIDE.md](./SETUP_GUIDE.md#useful-commands)

---

## 📊 **Project Stats**

- **Products:** 60 Samsung devices
- **Categories:** 19 categories
- **Features:** 10+ major features
- **Tech Stack:** Laravel + React + Docker
- **Database:** MySQL 8.0

---

## 🆘 **Getting Help**

1. **Check documentation** in this order:
   - Quick Start → Setup Guide → ENV Reference
   
2. **Common issues** are documented in:
   - [SETUP_GUIDE.md](./SETUP_GUIDE.md#troubleshooting)
   - [QUICK_START.md](./QUICK_START.md#common-issues)

3. **Still stuck?**
   - Check Docker logs: `docker-compose logs -f`
   - Verify containers: `docker-compose ps`
   - Clear caches: `php artisan optimize:clear`

---

## 🎯 **Next Steps**

After setup:
1. ✅ Test the application
2. ✅ Try creating an account
3. ✅ Browse products
4. ✅ Add items to cart
5. ✅ Make a test order
6. ✅ Try admin dashboard

---

## 📝 **Contributing**

Before making changes:
1. Read project documentation
2. Test locally first
3. Don't commit `.env` files
4. Clear caches after changes

---

**Happy Coding!** 🚀

*Last Updated: March 8, 2026*
