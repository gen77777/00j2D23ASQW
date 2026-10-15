# Portfolio

A Next.js 16 (App Router) personal portfolio built around one signature element — a scroll-scrubbed,
pointer-tilted "typographic ring" — plus a hand-rolled, password-protected CMS and a full GSAP/Lenis
motion system with a real `prefers-reduced-motion` fallback throughout. See `MOTION.md` for a
timeline-by-timeline breakdown of every animation.

## Features

- **Next.js App Router**, static-first, server-rendered content from a single JSON file.
- **Design tokens**: a dark-first `ink`/`paper` monochrome system (see `src/styles/tokens.css`) —
  flat UI stays two colors; everything else is an event owned by motion.
- **Type system**: three roles, three families — Bricolage Grotesque (display, variable
  opsz/wdth), Hanken Grotesk (body), Martian Mono (utility/eyebrows). All self-hosted via
  `next/font`, no static weight files.
- **Motion system**: `MotionProvider` owns Lenis + GSAP plugin registration + reduced-motion
  detection; `SplitLines`, `Marquee`, `MagneticButton`, `Cursor`, `TypographicRing` build on it.
  Full contract in `MOTION.md`.
- **CMS**: a local JSON file (`src/data/content.json`) edited through `/admin`, gated by a
  password (scrypt + HMAC-signed cookie via `proxy.ts`) — see Admin access below. Image uploads
  are resized and converted to WebP with `sharp`.
- **Routes**: `/`, `/contact`, `/projects/[slug]`, `/privacy-policy`, plus generated
  `sitemap.xml`, `robots.txt`, and per-route Open Graph/Twitter share images.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the site. `/admin` requires environment variables — see below.

## Admin access

`/admin` has no default credentials; you set them yourself:

```bash
# Generate ADMIN_PASSWORD_HASH
node scripts/hash-password.mjs "your-password"

# Generate SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy `.env.example` to `.env.local` and paste both values in, plus `NEXT_PUBLIC_SITE_URL` for
production (used for canonical URLs, the sitemap, and Open Graph image resolution). Without these
set, `/admin` will redirect to a login screen you can't pass — that's expected, not a bug.

## Deployment (Docker)

```bash
cp .env.example .env   # fill in SESSION_SECRET / ADMIN_PASSWORD_HASH / NEXT_PUBLIC_SITE_URL
docker compose up -d --build
```

- Base image is `node:22-alpine` (Next.js 16 requires Node 20.9+).
- `docker-compose.yml` bind-mounts `./src/data` and `./public/uploads` so CMS edits and uploaded
  images persist across container restarts — there's no database, by design (see "CMS" above).
- `next.config.ts` includes `outputFileTracingIncludes` for `sharp`'s native binary, per Next's
  own standalone-output guidance.

### Reverse proxy example

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

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4 (CSS-first `@theme`)
- GSAP (ScrollTrigger, SplitText) + Lenis
- sharp (image processing)
