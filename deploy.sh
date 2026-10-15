#!/bin/bash
set -e

echo "=================================================="
echo "  Portfolio — 一键生产打包与部署脚本 (One-Click Deploy)"
echo "=================================================="

# 1. 确保安装依赖并完成生产构建
echo "📦 正在执行 Next.js 生产环境构建..."
npm run build

# 2. 复制静态资源至 standalone 运行目录（Next.js 独立运行规范）
echo "📂 正在同步静态资源到 standalone 目录..."
mkdir -p .next/standalone/.next
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

echo ""
echo "✅ 打包构建完成！"
echo "=================================================="
echo "您可以通过以下任意一种方式一键启动生产服务："
echo ""
echo "👉 方式 1（Node 直接启动，最快）："
echo "   node .next/standalone/server.js"
echo ""
echo "👉 方式 2（标准生产运行）："
echo "   npm run start"
echo ""
echo "👉 方式 3（Docker 容器化部署）："
echo "   docker compose up -d --build"
echo ""
echo "👉 方式 4（云端一键托管）："
echo "   直接在 Vercel (https://vercel.com) 或 Railway 导入 GitHub 仓库："
echo "   https://github.com/genshouketsu-sys/00j2D23ASQW.git"
echo "=================================================="
