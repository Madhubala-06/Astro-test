# Sanity CMS Setup Guide

A beginner-friendly guide to setting up Sanity CMS with Astro.

---

## What is Sanity?

Sanity is a **headless CMS** (Content Management System) that lets non-developers edit website content without touching code.

```
Traditional CMS (WordPress)     Headless CMS (Sanity)
─────────────────────────────   ─────────────────────
Content + Website together      Content separate from Website

┌─────────────────────┐         ┌─────────────┐    ┌─────────────┐
│  WordPress          │         │  Sanity     │    │  Astro      │
│  (All-in-one)       │         │  (Content)  │───▶│  (Website)  │
└─────────────────────┘         └─────────────┘    └─────────────┘
                                       │
                                       ▼
                                Can connect to ANY
                                frontend (React, Vue,
                                mobile app, etc.)
```

---

## Part 1: Create Sanity Project

### Step 1: Go to Sanity Dashboard

1. Visit **[sanity.io/manage](https://www.sanity.io/manage)**
2. Sign up / Login with Google or GitHub
3. Click **"Create Project"**
4. Enter project name (e.g., `my-website`)
5. Click **"Create"**

### Step 2: Note Your Credentials

After creating, you'll see:

```
Project ID:  abc123xyz    ← Copy this!
Dataset:     production   ← Default dataset name
```

---

## Part 2: Connect Astro to Sanity

### Step 1: Install Sanity Client

```bash
cd /your/astro/project
pnpm add @sanity/client @sanity/image-url
```

### Step 2: Create Sanity Config File

Create `src/lib/sanity.ts`:

```typescript
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "YOUR_PROJECT_ID",  // Replace with your Project ID
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// For images
const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: any) {
  return builder.image(source);
}
```

### Step 3: Create Environment File

Create `.env` in project root:

```env
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
```

Update `src/lib/sanity.ts` to use env variables:

```typescript
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});
```

---

## Part 3: Set Up Sanity Studio (Content Editor UI)

### Step 1: Create Studio Folder

```bash
mkdir studio
cd studio
```

### Step 2: Create package.json

```json
{
  "name": "studio",
  "private": true,
  "scripts": {
    "dev": "sanity dev",
    "build": "sanity build",
    "deploy": "sanity deploy"
  },
  "dependencies": {
    "sanity": "^3.57.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@sanity/vision": "^3.57.0"
  }
}
```

### Step 3: Create sanity.config.ts

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'my-studio',
  title: 'My Website',

  projectId: 'YOUR_PROJECT_ID',  // Replace!
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
```

### Step 4: Create sanity.cli.ts

```typescript
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'YOUR_PROJECT_ID',  // Replace!
    dataset: 'production',
  },
})
```

### Step 5: Create Schemas

Schemas define **what content can be created**.

Create `studio/schemas/index.ts`:

```typescript
import homepage from './homepage'

export const schemaTypes = [homepage]
```

Create `studio/schemas/homepage.ts`:

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
    }),
  ],
})
```

### Step 6: Install Dependencies & Login

```bash
cd studio
pnpm install
npx sanity login    # Opens browser for authentication
```

### Step 7: Start Sanity Studio

```bash
pnpm dev
```

Open **http://localhost:3333** in browser.

---

## Part 4: Create Content in Sanity Studio

1. Open **http://localhost:3333**
2. Click **"Homepage"** in sidebar
3. Click **"Create new document"**
4. Fill in the fields:
   - Hero Title: "Welcome to My Site"
   - Hero Subtitle: "Building something amazing"
5. Click **"Publish"** (green button)

---

## Part 5: Fetch Content in Astro

### GROQ Query Language

Sanity uses **GROQ** (like SQL but for JSON):

```groq
// Get all documents of type "homepage"
*[_type == "homepage"]

// Get first homepage document
*[_type == "homepage"][0]

// Get specific fields
*[_type == "homepage"][0] {
  heroTitle,
  heroSubtitle,
  heroImage
}
```

### Fetch in Astro Page

```astro
---
// src/pages/index.astro
import { sanityClient } from '../lib/sanity';

// Fetch content from Sanity
const homepage = await sanityClient.fetch(`
  *[_type == "homepage"][0] {
    heroTitle,
    heroSubtitle
  }
`);
---

<html>
  <body>
    <h1>{homepage.heroTitle}</h1>
    <p>{homepage.heroSubtitle}</p>
  </body>
</html>
```

---

## Part 6: Deploy Sanity Studio

```bash
cd studio
npx sanity deploy
```

Enter a hostname (e.g., `my-website`)

Your CMS will be live at: **https://my-website.sanity.studio**

---

## Common Schema Field Types

| Type | Example | Description |
|------|---------|-------------|
| `string` | `"Hello"` | Single line text |
| `text` | `"Long text..."` | Multi-line text |
| `number` | `42` | Numbers |
| `boolean` | `true/false` | Checkbox |
| `image` | - | Image upload |
| `array` | `[...]` | List of items |
| `object` | `{...}` | Group of fields |
| `reference` | - | Link to another document |
| `slug` | `"my-page"` | URL-friendly text |
| `block` | - | Rich text editor |

---

## Next Steps

- [03-architecture-and-deploy.md](./03-architecture-and-deploy.md) - Full architecture & deployment
