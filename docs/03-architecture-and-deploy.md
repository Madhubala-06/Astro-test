# Architecture & Deployment Guide

Complete guide to understanding the Astro + Sanity architecture and deploying to production.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           COMPLETE ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   CONTENT CREATORS                    DEVELOPERS                            │
│   (Marketing Team)                    (You)                                 │
│         │                                │                                  │
│         ▼                                ▼                                  │
│   ┌─────────────┐                 ┌─────────────┐                          │
│   │   Sanity    │                 │   VS Code   │                          │
│   │   Studio    │                 │   (Code)    │                          │
│   │             │                 │             │                          │
│   │ Edit content│                 │ Edit code   │                          │
│   │ No coding!  │                 │             │                          │
│   └──────┬──────┘                 └──────┬──────┘                          │
│          │                               │                                  │
│          ▼                               ▼                                  │
│   ┌─────────────────────────────────────────────────────────┐              │
│   │                    SANITY CLOUD                         │              │
│   │                    (Database)                           │              │
│   │                                                         │              │
│   │   Project ID: odwnzl2n                                  │              │
│   │   Dataset: production                                   │              │
│   │                                                         │              │
│   │   Stores: Text, Images, Videos, Documents               │              │
│   │   FREE: 100K API requests/month                         │              │
│   └────────────────────────┬────────────────────────────────┘              │
│                            │                                                │
│                            │ API Call                                       │
│                            ▼                                                │
│   ┌─────────────────────────────────────────────┐                          │
│   │              ASTRO (Build)                  │                          │
│   │                                             │                          │
│   │  1. Fetches content from Sanity            │                          │
│   │  2. Generates static HTML pages            │                          │
│   │  3. Outputs to /dist folder                │                          │
│   └────────────────────────┬────────────────────┘                          │
│                            │                                                │
│                            ▼                                                │
│   ┌─────────────────────────────────────────────┐                          │
│   │              VERCEL (Hosting)               │                          │
│   │                                             │                          │
│   │   Hosts static HTML files                   │                          │
│   │   Global CDN (fast everywhere)              │                          │
│   │   FREE tier available                       │                          │
│   │                                             │                          │
│   │   URL: https://yoursite.vercel.app          │                          │
│   └────────────────────────┬────────────────────┘                          │
│                            │                                                │
│                            ▼                                                │
│   ┌─────────────────────────────────────────────┐                          │
│   │              USERS                          │                          │
│   │                                             │                          │
│   │   Visit your website                        │                          │
│   │   Super fast loading (static HTML)          │                          │
│   └─────────────────────────────────────────────┘                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: How Content Gets to Users

```
STEP 1: Create Content
──────────────────────

Marketing Team → Sanity Studio → Publish
                     │
                     ▼
              Saved to Sanity Cloud


STEP 2: Trigger Build (Automatic with Webhook)
──────────────────────────────────────────────

Sanity Cloud ──webhook──▶ Vercel
                              │
                              ▼
                         Starts Build


STEP 3: Build Process
─────────────────────

Astro fetches from Sanity API
         │
         ▼
Generates HTML files
         │
         ▼
    /dist folder
    ├── index.html
    ├── pricing/index.html
    └── about/index.html


STEP 4: Deploy
──────────────

Vercel deploys /dist to CDN
         │
         ▼
Live at yoursite.com
```

---

## What Gets Hosted Where

| Component | Hosted On | URL | Cost |
|-----------|-----------|-----|------|
| **Website** (Astro) | Vercel | `yoursite.com` | FREE |
| **CMS UI** (Sanity Studio) | Sanity | `yoursite.sanity.studio` | FREE |
| **Database** (Content) | Sanity Cloud | `api.sanity.io` | FREE |
| **Images/Assets** | Sanity CDN | `cdn.sanity.io` | FREE |

**Total Cost: FREE** (for most projects)

---

## Deployment Guide

### Step 1: Deploy Astro to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
pnpm add -g vercel

# Go to Astro project
cd /your/astro/project

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: my-website
# - Directory: ./
# - Override settings? No
```

#### Option B: Using GitHub (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"Import Project"**
4. Select your GitHub repo
5. Vercel auto-detects Astro
6. Click **"Deploy"**

#### Add Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add:
   ```
   PUBLIC_SANITY_PROJECT_ID = your_project_id
   PUBLIC_SANITY_DATASET = production
   ```

---

### Step 2: Deploy Sanity Studio

```bash
cd /your/astro/project/studio

# Deploy to Sanity's hosting
npx sanity deploy

# Enter hostname: my-website
# Studio URL: https://my-website.sanity.studio
```

---

### Step 3: Set Up Auto-Deploy (Webhook)

When content changes in Sanity → Auto-rebuild website on Vercel.

#### Get Vercel Deploy Hook

1. Vercel Dashboard → Your Project
2. Settings → Git → Deploy Hooks
3. Create Hook:
   - Name: `Sanity Content Update`
   - Branch: `main`
4. Copy the URL (looks like `https://api.vercel.com/v1/integrations/deploy/...`)

#### Add Webhook in Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. API → Webhooks → Add Webhook
4. Configure:
   ```
   Name: Vercel Deploy
   URL: [paste Vercel hook URL]
   Trigger on: Create, Update, Delete
   Filter: _type in ["homepage", "pricing", "blog"]
   ```
5. Save

#### How It Works

```
Content published in Sanity
         │
         ▼
Sanity sends webhook to Vercel
         │
         ▼
Vercel rebuilds Astro (2-3 min)
         │
         ▼
Website updated automatically!
```

---

## Project Structure (Final)

```
my-astro-project/
│
├── public/                 # Static assets
│   └── favicon.svg
│
├── src/
│   ├── components/         # Reusable components
│   │   └── Header.astro
│   │
│   ├── layouts/            # Page layouts
│   │   └── Layout.astro
│   │
│   ├── lib/                # Utilities
│   │   └── sanity.ts       # Sanity client
│   │
│   ├── pages/              # Routes
│   │   ├── index.astro     # → yoursite.com/
│   │   ├── pricing.astro   # → yoursite.com/pricing
│   │   └── blog/
│   │       └── [slug].astro # → yoursite.com/blog/post-name
│   │
│   └── styles/
│       └── global.css      # Tailwind
│
├── studio/                 # Sanity Studio (separate)
│   ├── schemas/
│   │   ├── index.ts
│   │   ├── homepage.ts
│   │   └── pricing.ts
│   ├── sanity.config.ts
│   ├── sanity.cli.ts
│   └── package.json
│
├── .env                    # Environment variables (don't commit!)
├── .env.example            # Example env file (commit this)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Quick Commands Reference

### Development

```bash
# Start Astro dev server
pnpm dev

# Start Sanity Studio
cd studio && pnpm dev
```

### Build & Deploy

```bash
# Build Astro
pnpm build

# Preview build
pnpm preview

# Deploy to Vercel
vercel

# Deploy Sanity Studio
cd studio && npx sanity deploy
```

### Sanity CLI

```bash
# Login
npx sanity login

# Open Sanity dashboard
npx sanity manage

# Test GROQ queries
npx sanity documents query '*[_type == "homepage"]'
```

---

## Checklist: Before Going Live

- [ ] Sanity project created
- [ ] Environment variables set (local & Vercel)
- [ ] All schemas defined
- [ ] Content created in Sanity Studio
- [ ] Astro pages fetch from Sanity
- [ ] Website deployed to Vercel
- [ ] Sanity Studio deployed
- [ ] Webhook set up for auto-deploy
- [ ] Custom domain configured (optional)

---

## Troubleshooting

### "Failed to fetch from Sanity"

- Check `PUBLIC_SANITY_PROJECT_ID` is correct
- Check dataset name (usually `production`)
- Ensure content is **published** (not just draft)

### "Build fails on Vercel"

- Check environment variables are set in Vercel
- Check Node.js version (should be 18+)

### "Content not updating"

- Webhook might not be set up
- Try manual redeploy: `vercel --prod`
- Check if content is **published** in Sanity

---

## Useful Links

- [Astro Docs](https://docs.astro.build)
- [Sanity Docs](https://www.sanity.io/docs)
- [Vercel Docs](https://vercel.com/docs)
- [GROQ Cheat Sheet](https://www.sanity.io/docs/groq)
