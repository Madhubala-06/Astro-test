# Astro Setup Guide

A beginner-friendly guide to setting up Astro for static websites.

---

## What is Astro?

Astro is a **web framework** for building fast, content-focused websites like:
- Marketing sites
- Landing pages
- Blogs
- Documentation

**Key Features:**
- Zero JavaScript by default (super fast)
- Works with React, Vue, Svelte (Islands Architecture)
- Great for SEO
- Simple to learn

---

## Prerequisites

- **Node.js** v18.20.8 or v20+ (check with `node --version`)
- **pnpm** (or npm/yarn)

---

## Step 1: Create Astro Project

```bash
# Create new directory
mkdir my-astro-project
cd my-astro-project

# Create Astro project
pnpm create astro@latest . -- --template basics --install --no-git -y
```

| Flag | Meaning |
|------|---------|
| `.` | Install in current directory |
| `--template basics` | Use basic starter template |
| `--install` | Auto-install dependencies |
| `--no-git` | Don't initialize git |
| `-y` | Yes to all prompts |

---

## Step 2: Project Structure

After setup, you'll have:

```
my-astro-project/
├── public/              # Static assets (images, fonts)
│   └── favicon.svg
├── src/
│   ├── components/      # Reusable components
│   ├── layouts/         # Page layouts
│   ├── pages/           # Each file = one page
│   │   └── index.astro  # Homepage (yoursite.com/)
│   └── styles/          # CSS files
├── astro.config.mjs     # Astro configuration
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript config
```

---

## Step 3: Add Tailwind CSS

```bash
pnpm astro add tailwind --yes
```

This automatically:
- Installs Tailwind
- Creates `src/styles/global.css`
- Updates `astro.config.mjs`

---

## Step 4: Run Development Server

```bash
pnpm dev
```

Open **http://localhost:4321** in your browser.

---

## Step 5: Create a Page

Create `src/pages/about.astro`:

```astro
---
// This is the "frontmatter" - runs on server
const title = "About Us";
---

<!-- This is HTML with some magic -->
<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
    <p>Welcome to our website!</p>
  </body>
</html>
```

Now visit **http://localhost:4321/about**

---

## Step 6: Build for Production

```bash
pnpm build
```

This creates static HTML files in the `dist/` folder.

---

## Step 7: Preview Production Build

```bash
pnpm preview
```

---

## Useful Commands

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm astro add <integration>` | Add integrations |

---

## Adding Integrations

```bash
# Add React
pnpm astro add react

# Add Vue
pnpm astro add vue

# Add MDX (for markdown with components)
pnpm astro add mdx
```

---

## Astro File Syntax (.astro)

```astro
---
// FRONTMATTER (JavaScript - runs on server)
import Layout from '../layouts/Layout.astro';
import Button from '../components/Button.astro';

const name = "World";
const items = ["Apple", "Banana", "Orange"];
---

<!-- TEMPLATE (HTML with expressions) -->
<Layout>
  <h1>Hello, {name}!</h1>

  <!-- Loop -->
  <ul>
    {items.map(item => (
      <li>{item}</li>
    ))}
  </ul>

  <!-- Conditional -->
  {name === "World" && <p>Welcome!</p>}

  <!-- Component -->
  <Button text="Click me" />
</Layout>

<style>
  /* Scoped CSS - only applies to this file */
  h1 {
    color: blue;
  }
</style>
```

---

## Next Steps

- [02-sanity-setup.md](./02-sanity-setup.md) - Add Sanity CMS
- [03-architecture-and-deploy.md](./03-architecture-and-deploy.md) - Deploy to Vercel
