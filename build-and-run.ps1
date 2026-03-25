# Docker 部署脚本
param(
    [switch]$BuildOnly,
    [switch]$RunOnly
)

$projectPath = "C:\Users\hp\.openclaw\agents\xiaobai\workspace\k-story"
Set-Location $projectPath

Write-Host "🚀 开始部署 k-story 小说网站..." -ForegroundColor Cyan

# 检查 Docker 是否运行
if (!(docker info -Q 2>$null)) {
    Write-Host "❌ Docker 未运行，请启动 Docker Desktop" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker 已启动" -ForegroundColor Green

# 构建镜像
if (-not $RunOnly) {
    Write-Host "📦 构建 Docker 镜像..." -ForegroundColor Cyan
    docker build -t k-story:latest .
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 构建失败" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ 镜像构建成功" -ForegroundColor Green
}

# 停止旧容器
Write-Host "🛑 停止旧容器..." -ForegroundColor Cyan
docker stop k-story 2>$null
docker rm k-story 2>$null

# 运行新容器
if (-not $BuildOnly) {
    Write-Host "🚀 启动容器..." -ForegroundColor Cyan
    docker run -d `
        --name k-story `
        -p 3000:3000 `
        --restart unless-stopped `
        k-story:latest
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 启动失败" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ 容器启动成功！" -ForegroundColor Green
    Write-Host "🌐 访问地址: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "📊 查看日志: docker logs -f k-story" -ForegroundColor Cyan
}

Write-Host "🎉 部署完成！" -ForegroundColor Green
