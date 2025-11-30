# Development Setup Script
# Run: ./dev-up.ps1 to start the development environment

Write-Host "Starting Scorpion Development Environment..." -ForegroundColor Cyan

# Check if Docker is running
try {
    docker ps > $null
    Write-Host "✓ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}

# Start services
Write-Host "Starting services..." -ForegroundColor Yellow
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

Write-Host "`nDevelopment environment started!" -ForegroundColor Green
Write-Host "Services running at:" -ForegroundColor Cyan
Write-Host "  - Frontend:   http://localhost:3000" -ForegroundColor White
Write-Host "  - API:        http://localhost:5000" -ForegroundColor White
Write-Host "  - Swagger:    http://localhost:8080" -ForegroundColor White
Write-Host "  - Database:   localhost:5436" -ForegroundColor White
Write-Host "`nTo stop: docker-compose -f docker-compose.yml -f docker-compose.dev.yml down" -ForegroundColor Gray
