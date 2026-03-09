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

# Setup backend
cd is-web-project
cp .env.example .env
docker-compose up -d
docker-compose exec app composer install
docker-compose exec app php artisan jwt:secret
docker-compose exec app php artisan migrate
Get-Content database/esapp.sql -Encoding UTF8 | docker-compose exec -T db mysql -uroot -pdh28042005 esapp

# Setup frontend
cd ../electronic-e-commerce
cp .env.example .env
docker-compose up

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
├── electronic-e-commerce/     # React Frontend
├── is-web-project/            # Laravel Backend
├── SETUP_GUIDE.md            # Complete setup instructions
├── QUICK_START.md            # Quick reference
└── README.md                 # This file
```

---

## 🛑 **Stop Project**

```bash
# Stop frontend: Ctrl+C

# Stop backend:
cd is-web-project
docker-compose down
```

---

## 📚 **Documentation**

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
