# Electronic E-Commerce Frontend

React + Vite e-commerce frontend application with Docker support.

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Create .env file
cp .env.example .env  # Or create manually

# Start development server
docker-compose up

# Access at http://localhost:5173
```

### Using npm directly

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

## 🐳 Docker Commands

```bash
# Start (foreground with logs)
docker-compose up

# Start (background)
docker-compose up -d

# Stop
docker-compose down

# Rebuild after changes
docker-compose build --no-cache

# View logs
docker-compose logs -f

# Access container shell
docker-compose exec frontend sh
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Environment Variables

Create a `.env` file:

```env
VITE_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
VITE_GOOGLE_REDIRECT_URI="http://localhost:5173/auth/callback"
VITE_BACKEND_API_URL="http://localhost:8000/api"
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── lib/            # API client and utilities
├── context/        # React context providers
├── assets/         # Static assets
└── App.jsx         # Main app component
```

## 🛠️ Tech Stack

- **React** 19.1.1
- **Vite** 7.1.7
- **React Router** 7.9.5
- **Axios** - API requests
- **Tailwind CSS** 4.1.14
- **Lucide React** - Icons
- **Bootstrap** 5.3.8

## 📚 Documentation

See the main project documentation:
- [Setup Guide](../SETUP_GUIDE.md)
- [Quick Start](../QUICK_START.md)
- [Docker Guide](./README.Docker.md)

## React + Vite

This template uses [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) for Fast Refresh with HMR.
