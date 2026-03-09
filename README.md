# ĐỒ ÁN MÔN HỌC PHÁT TRIỂN ỨNG DỤNG WEB (IS402)

## 🛒 Samsung E-Commerce Platform

A full-stack e-commerce application built with Laravel (backend) and React (frontend), featuring product catalog, shopping cart, order management, and Google OAuth authentication.

---

## 🚀 **Quick Links**

- 📖 **[Complete Setup Guide](./SETUP_GUIDE.md)** - Detailed step-by-step instructions
- ⚡ **[Quick Start](./QUICK_START.md)** - For experienced developers
- 🌐 **[Google OAuth Setup](./GOOGLE_OAUTH_SETUP.md)** - Configure Google Sign-In

---

## ✨ **Features**

- 🔐 User Authentication (JWT + Google OAuth)
- 🛍️ Product Catalog (60+ Samsung products)
- 🛒 Shopping Cart & Checkout
- 📦 Order Management
- 👨‍💼 Admin Dashboard
- 🎁 Rewards & Promotions System
- 📧 Email Verification
- 💳 Payment Integration Ready

---

## 🏗️ **Tech Stack**

### **Backend:**
- Laravel (PHP Framework)
- MySQL 8.0
- JWT Authentication
- Docker + Docker Compose

### **Frontend:**
- React 19.1.1
- Vite
- React Router
- Axios
- Tailwind CSS
- Docker + Docker Compose

---

## 📋 **Prerequisites**

- Docker Desktop
- Git

---

## ⚡ **Quick Start**

```bash
# Clone repository
git clone <repository-url>
cd Do-An-IS402

# Setup environment files
cp is-web-project/.env.example is-web-project/.env
cp electronic-e-commerce/.env.example electronic-e-commerce/.env

# Start all services (one command!)
docker-compose up -d

# Setup backend
docker-compose exec backend composer install
docker-compose exec backend php artisan jwt:secret
docker-compose exec backend php artisan migrate
docker cp is-web-project/database/esapp.sql ecommerce-db:/tmp/esapp.sql
docker-compose exec db bash -c "mysql -uroot -pdh28042005 esapp < /tmp/esapp.sql"
docker cp is-web-project/database/esapp.sql $(docker-compose ps -q db | Select-Object -First 1):/tmp/esapp.sql
docker-compose exec db bash -c "mysql -uroot -pdh28042005 esapp < /tmp/esapp.sql"

# Visit http://localhost:5173
```

**For detailed instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

---

## 🌐 **Access Points**

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | - |
| **Backend API** | http://localhost:8000/api | - |
| **phpMyAdmin** | http://localhost:8080 | root / dh28042005 |
| **MySQL** | localhost:3307 | root / dh28042005 |

---

## 📁 **Project Structure**

```
Do-An-IS402/
├── docker-compose.yml        # 🆕 Unified Docker orchestration
├── electronic-e-commerce/    # React Frontend
├── is-web-project/           # Laravel Backend
├── SETUP_GUIDE.md           # Complete setup instructions
├── QUICK_START.md           # Quick reference
├── DOCKER_SETUP.md          # Docker architecture explanation
└── README.md                # This file
```

---

## 🛑 **Stop Project**

```bash
# From project root - stops everything
docker-compose down
```

---

## 📚 **Documentation**

- **[Setup Guide](./SETUP_GUIDE.md)** - Detailed step-by-step setup
- **[Quick Start](./QUICK_START.md)** - Fast setup for experienced developers
- **[Docker Setup](./DOCKER_SETUP.md)** - Docker architecture explained
- **[Google OAuth Setup](./GOOGLE_OAUTH_SETUP.md)** - OAuth configuration
- **[ENV Reference](./ENV_REFERENCE.md)** - Environment variables explained

### **External Resources:**
- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Docker Documentation](https://docs.docker.com)

---

## 👥 **Team**

Môn học: IS402 - Phát Triển Ứng Dụng Web

**UIT - Đại học Công nghệ Thông tin**

---

## 📝 **License**

This project is developed for educational purposes.

---

**Happy Coding!** 🎉
