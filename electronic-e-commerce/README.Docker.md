# Docker Setup for Electronic E-Commerce Frontend

This document explains how to run the frontend application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)

## Quick Start

### Development Mode

Using Docker Compose (recommended):
```bash
docker-compose up frontend-dev
```

Using Docker directly:
```bash
docker build --target development -t electronic-ecommerce:dev .
docker run -p 5173:5173 -v ${PWD}:/app -v /app/node_modules electronic-ecommerce:dev
```

The development server will be available at `http://localhost:5173`

### Production Mode

Using Docker Compose:
```bash
docker-compose --profile production up frontend-prod
```

Using Docker directly:
```bash
docker build --target production -t electronic-ecommerce:prod .
docker run -p 3000:80 electronic-ecommerce:prod
```

The production server will be available at `http://localhost:3000`

## Docker Commands

### Build Images

Development:
```bash
docker build --target development -t electronic-ecommerce:dev .
```

Production:
```bash
docker build --target production -t electronic-ecommerce:prod .
```

### Run Containers

Development with hot reload:
```bash
docker run -p 5173:5173 -v ${PWD}:/app -v /app/node_modules electronic-ecommerce:dev
```

Production:
```bash
docker run -p 3000:80 electronic-ecommerce:prod
```

### Stop and Remove Containers

```bash
docker-compose down
```

Or manually:
```bash
docker stop electronic-ecommerce-dev
docker rm electronic-ecommerce-dev
```

## Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Electronic E-Commerce
```

## Docker Architecture

### Multi-Stage Build

1. **Development Stage**: Uses Node.js with hot reload for development
2. **Build Stage**: Compiles the application for production
3. **Production Stage**: Serves static files using Nginx

### Ports

- Development: `5173` (Vite default)
- Production: `80` (Nginx, mapped to `3000` on host)

### Volumes

Development mode mounts:
- Application code: `./:/app`
- Node modules: `/app/node_modules` (anonymous volume)

## Troubleshooting

### Port Already in Use

If port 5173 or 3000 is already in use, modify the port mapping:

```bash
docker run -p 8080:5173 electronic-ecommerce:dev
```

Or update `docker-compose.yml`:
```yaml
ports:
  - "8080:5173"
```

### Hot Reload Not Working

Ensure volume mounting is correct and the container has access to your files.

### Build Failures

Clear Docker cache and rebuild:
```bash
docker-compose build --no-cache
```

## Integration with Backend

To connect with the Laravel backend, ensure both services are on the same Docker network. Update the `VITE_API_URL` in your `.env` file to point to the backend service.

Example in a shared `docker-compose.yml`:
```yaml
services:
  frontend:
    # ... frontend config
    environment:
      - VITE_API_URL=http://backend:8000/api
    networks:
      - ecommerce-network
  
  backend:
    # ... backend config
    networks:
      - ecommerce-network
```
