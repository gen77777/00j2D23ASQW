# Brutalist Portfolio - 生产环境部署指南

本项目已完全按照业界标准（Industry Standard）配置，随时可以打包并上传至任何支持 Docker 的云服务器（VPS, AWS EC2, 阿里云, 腾讯云等）。

## 核心部署方案：Docker Compose（推荐）

该项目内置了完整配置的 `Dockerfile` 和 `docker-compose.yml`，并且特别配置了 **数据卷映射 (Volume Mapping)**。
**原因**：为了确保您在 CMS 后台（`/admin`）修改的文字配置以及上传的图片能够永久保存在服务器硬盘上，即使重启系统也不会丢失。

### 1. 将项目上传至服务器
您可以通过 `git clone`，或者直接将本地打包好的压缩包通过 SFTP/SCP 上传至您的云服务器。

### 2. 在服务器上运行服务
确保您的服务器已安装 [Docker](https://docs.docker.com/get-docker/) 和 [Docker Compose](https://docs.docker.com/compose/install/)。

进入项目根目录（`docker-compose.yml` 所在的目录），在终端执行以下命令：

```bash
# 后台一键启动并构建镜像
docker-compose up -d --build
```

### 3. 配置反向代理 (Nginx / Caddy)
项目默认运行在服务器的 `3000` 端口。推荐使用 Nginx 配置域名反向代理，并开启 HTTPS：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_addrs;
    }
}
```

### 4. 日常维护命令

```bash
# 查看运行日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重启服务（如果您手动在服务器修改了代码）
docker-compose up -d --build
```

---

## 目录与数据持久化说明
在 `docker-compose.yml` 中，我们做了如下硬盘映射：
- `./src/data:/app/src/data` (保存您的 JSON 配置)
- `./public/uploads:/app/public/uploads` (保存您的本地图片)

**请注意**：如果您在服务器上手动删除了这两个宿主机目录下的文件，网站的前台数据也将同步丢失！请定期备份 `./src/data/content.json` 文件。
