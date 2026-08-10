# Portfolio CMS

A Next.js 14 based portfolio application with an integrated local Content Management System (CMS) and custom 3D web animations.

## Features

- **Next.js App Router**: Server-side rendering and static generation.
- **Local JSON CMS**: Manage hero section, typography, 3D parameters, and project media via a dedicated `/admin` route.
- **GSAP Animations**: Custom 3D cylinder text transformations and smooth reveal effects.
- **Custom Cursor**: Canvas-based interactive cursor with trajectory trails.
- **Production Ready**: Optimized Docker multi-stage build setup with standalone output.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Navigate to `http://localhost:3000` for the frontend application.
Navigate to `http://localhost:3000/admin` for the CMS dashboard.

## Deployment (Docker)

The application includes a `Dockerfile` optimized for Next.js standalone builds and a `docker-compose.yml` for simplified orchestration.

### 1. Build and Start
```bash
docker-compose up -d --build
```

### 2. Volume Mapping
The `docker-compose.yml` mounts local directories to persist CMS data across container restarts:
- `./src/data:/app/src/data`
- `./public/uploads:/app/public/uploads`

### 3. Nginx Reverse Proxy Example
Map the exposed port 3000 to your domain using standard reverse proxy configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Stack

- Next.js (React)
- Tailwind CSS
- GSAP (GreenSock Animation Platform)
- Lenis (Smooth Scrolling)
