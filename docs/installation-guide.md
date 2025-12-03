# Scorpion - Installation Guide

Step-by-step guide to set up the development environment for the Scorpion full-stack application.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Git**

### Verify Installation

```
docker --version
docker compose version
git --version
```

## Project Structure

Ensure your project has the following structure:

```
scorpion/
├── frontend/
│   ├── Dockerfile              # Production build
│   ├── Dockerfile.dev          # Development build
│   ├── package.json
│   └── package-lock.json
├── maintainance/
│   ├── Dockerfile              # Production build
│   ├── Dockerfile.dev          # Development build
│   ├── package.json
│   └── package-lock.json
├── docker-compose.yml          # Base configuration
├── docker-compose.override.yml # Development overrides
└── init.sql                    # Database initialization
```

## Installation Steps

### Step 1: Clone Repository

```
git clone <your-repository-url>
cd scorpion
```

### Step 2: Add User to Docker Group (Linux Only)

This allows running Docker commands without `sudo`:

```
# Add current user to docker group
sudo usermod -aG docker $USER

# Apply changes (or logout and login)
newgrp docker

# Verify
docker ps
```

### Step 3: Build and Start Services

```
# First time build (downloads images and builds containers)
docker compose up --build

# Subsequent starts (faster, uses cached images)
docker compose up

# Run in background (detached mode)
docker compose up -d
```

**Note:** The build process may take 5-10 minutes on first run as it downloads base images and installs dependencies.

### Step 5: Verify Services

Once all containers are running, access the following URLs:

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3001 | Next.js application |
| Maintenance | http://localhost:3002 | React admin portal |
| PostgREST API | http://localhost:5000 | REST API |
| Swagger UI | http://localhost:8080 | API documentation |
| pgAdmin | http://localhost:5050 | Database management |

#### pgAdmin Login Credentials
- Email: `admin@example.com`
- Password: `admin`

#### PostgreSQL Connection (for pgAdmin)
- Host: `db`
- Port: `5432`
- Database: `app_db`
- Username: `app_user`
- Password: `password`

### Step 6: Test Redis Connection

```
# Connect to Redis CLI
docker compose exec redis redis-cli

# Test connection
> PING
PONG

> EXIT
```

## Verify Installation

Check all containers are running:

```
docker compose ps
```

Expected output should show 7 services running:
- frontend
- maintainance
- server (PostgREST)
- db (PostgreSQL)
- redis
- swagger
- pgadmin

## Development Workflow

### Hot Reload

Code changes in `./frontend` and `./maintainance` directories automatically reflect in the browser without rebuilding containers.

### View Logs

```
# All services
docker compose logs -f

# Specific service
docker compose logs -f frontend

# Last 100 lines
docker compose logs --tail=100 frontend
```

### Restart Services

```
# Restart all
docker compose restart

# Restart specific service
docker compose restart frontend
```

### Stop Services

```
# Stop all (preserves data)
docker compose down

# Stop and remove volumes (fresh start)
docker compose down -v
```

## Troubleshooting

### Port Already in Use

If you see "port is already allocated" errors:

```
# Check what's using the port (example for port 3001)
sudo lsof -i :3001

# Kill the process or change port in docker-compose.yml
```

### Permission Denied Errors

```
# If node_modules created by Docker as root
sudo rm -rf frontend/node_modules maintainance/node_modules

# Rebuild
docker compose up --build
```

### Services Not Starting

```
# Check logs for errors
docker compose logs

# Clean rebuild
docker compose down -v
docker system prune -af
docker compose up --build
```

### Hot Reload Not Working

Ensure these environment variables are set in `docker-compose.override.yml`:
- `WATCHPACK_POLLING=true` (for Next.js)
- `CHOKIDAR_USEPOLLING=true` (for React)

### Database Connection Issues

```
# Check database health
docker compose exec db pg_isready -U app_user -d app_db

# Restart database
docker compose restart db
```

## Clean Installation

If you encounter persistent issues:

```
# Stop all containers
docker compose down -v

# Remove all Docker resources
docker system prune -af --volumes

# Rebuild from scratch
docker compose up --build
```

## Next Steps

Once installation is complete:

1. Frontend available at http://localhost:3001
2. Start developing - code changes auto-reload
3. Check API documentation at http://localhost:8080
4. Use pgAdmin at http://localhost:5050 for database management

## Getting Help

- Check Docker logs: `docker compose logs -f`
- Verify all services: `docker compose ps`
- Test individual containers: `docker compose exec <service> sh`

---

**Installation complete!** Your development environment is ready. Make code changes in `./frontend` or `./maintainance` and see them instantly reflected.