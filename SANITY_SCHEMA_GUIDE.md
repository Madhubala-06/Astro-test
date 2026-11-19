# 📝 Sanity Schema Guide

## What is a Schema?

A **schema** in Sanity defines the structure of your content. Think of it like a form template - it tells Sanity what fields to show in the editor and what type of data each field accepts.

---

## 🎯 How to Create Content in Sanity

### Step 1: Start Sanity Studio

```bash
cd studio
pnpm dev
```

This opens Sanity Studio at `http://localhost:3333`

### Step 2: Create a Blog Post

1. Click **"Blog Post"** in the sidebar
2. Click **"+ Create"** button
3. Fill in the fields:
   - **Title**: Your blog post title
   - **Slug**: Click "Generate" (creates URL-friendly version)
   - **Excerpt**: Short summary (shows on blog listing)
   - **Cover Image**: Upload a featured image
   - **Author**: Your name
   - **Published Date**: When to publish
   - **Category**: Choose from dropdown (Travel, Food, Tech, etc.)
   - **Tags**: Add keywords (press Enter after each)
   - **Content**: Write your blog post (rich text editor)
   - **Featured**: Toggle ON to show prominently
4. Click **"Publish"** button

---

## 🏗️ Schema Structure Explained

### Basic Schema Template

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'schemaName',        // Internal ID (lowercase, no spaces)
  title: 'Display Name',     // Shows in Sanity Studio
  type: 'document',          // Always 'document' for main content types
  fields: [
    // Your fields go here
  ],
})
```

---

## 📦 Common Field Types

### 1. **Text Fields**

```typescript
// Short text (single line)
defineField({
  name: 'title',
  title: 'Title',
  type: 'string',
  validation: Rule => Rule.required(), // Makes it required
})

// Long text (multiple lines)
defineField({
  name: 'description',
  title: 'Description',
  type: 'text',
  rows: 4, // Number of visible rows
})
```

### 2. **Rich Text (Content Editor)**

```typescript
defineField({
  name: 'content',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      options: { hotspot: true },
    },
  ],
})
```

### 3. **Images**

```typescript
defineField({
  name: 'coverImage',
  title: 'Cover Image',
  type: 'image',
  options: {
    hotspot: true, // Allows cropping focus point
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
    },
  ],
})
```

### 4. **Dropdown (Select)**

```typescript
defineField({
  name: 'category',
  title: 'Category',
  type: 'string',
  options: {
    list: [
      { title: 'Travel', value: 'travel' },
      { title: 'Food', value: 'food' },
      { title: 'Tech', value: 'technology' },
    ],
  },
})
```

### 5. **Date & Time**

```typescript
// Date only
defineField({
  name: 'eventDate',
  title: 'Event Date',
  type: 'date',
})

// Date + Time
defineField({
  name: 'publishedAt',
  title: 'Published At',
  type: 'datetime',
})
```

### 6. **Boolean (Toggle)**

```typescript
defineField({
  name: 'featured',
  title: 'Featured Post',
  type: 'boolean',
  initialValue: false,
  description: 'Show this post prominently',
})
```

### 7. **Number**

```typescript
defineField({
  name: 'rating',
  title: 'Rating',
  type: 'number',
  validation: Rule => Rule.min(1).max(5),
})
```

### 8. **URL**

```typescript
defineField({
  name: 'website',
  title: 'Website',
  type: 'url',
})
```

### 9. **Slug (URL-friendly)**

```typescript
defineField({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: {
    source: 'title', // Auto-generate from title
    maxLength: 96,
  },
  validation: Rule => Rule.required(),
})
```

### 10. **Array (Multiple Items)**

```typescript
// Array of strings (tags)
defineField({
  name: 'tags',
  title: 'Tags',
  type: 'array',
  of: [{ type: 'string' }],
  options: {
    layout: 'tags',
  },
})

// Array of objects
defineField({
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'array',
  of: [{ type: 'image' }],
})
```

### 11. **Object (Grouped Fields)**

```typescript
defineField({
  name: 'location',
  title: 'Location',
  type: 'object',
  fields: [
    { name: 'city', type: 'string', title: 'City' },
    { name: 'country', type: 'string', title: 'Country' },
    { name: 'coordinates', type: 'geopoint', title: 'Coordinates' },
  ],
})
```

---

## 🎨 Example: Creating a "Travel Destination" Schema

Let's create a new schema for travel destinations:

### 1. Create the Schema File

**File:** `studio/schemas/destination.ts`

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'destination',
  title: 'Travel Destination',
  type: 'document',
  fields: [
    // Basic Info
    defineField({
      name: 'name',
      title: 'Destination Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    
    // Location
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'geopoint',
      description: 'Pin location on map',
    }),
    
    // Content
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    
    // Details
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'string',
      options: {
        list: [
          { title: 'Spring', value: 'spring' },
          { title: 'Summer', value: 'summer' },
          { title: 'Fall', value: 'fall' },
          { title: 'Winter', value: 'winter' },
          { title: 'Year Round', value: 'year-round' },
        ],
      },
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5),
    }),
    defineField({
      name: 'mustTryFoods',
      title: 'Must Try Foods',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tips',
      title: 'Travel Tips',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    
    // Meta
    defineField({
      name: 'featured',
      title: 'Featured Destination',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  
  // Preview in list view
  preview: {
    select: {
      title: 'name',
      subtitle: 'country',
      media: 'coverImage',
    },
  },
})
```

### 2. Register the Schema

**File:** `studio/schemas/index.ts`

```typescript
import blogPost from './blogPost'
import destination from './destination'  // Add this

export const schemaTypes = [
  blogPost,
  destination,  // Add this
]
```

### 3. Restart Sanity Studio

```bash
# In the studio folder
pnpm dev
```

Now you'll see "Travel Destination" in the Sanity Studio sidebar!

---

## 🔄 How to Fetch Data in Astro

After creating content in Sanity, fetch it in your Astro pages:

```astro
---
import { sanityClient } from '../lib/sanity';

// Fetch all destinations
const destinations = await sanityClient.fetch(`
  *[_type == "destination"] | order(rating desc) {
    name,
    "slug": slug.current,
    country,
    description,
    coverImage,
    rating,
    featured
  }
`);
---

<div>
  {destinations.map(dest => (
    <div>
      <h2>{dest.name}</h2>
      <p>{dest.country}</p>
      <p>Rating: {dest.rating}/5</p>
    </div>
  ))}
</div>
```

---

## 🚀 Quick Tips

1. **Always use `slug` fields** for URL-friendly IDs
2. **Add descriptions** to help content editors understand fields
3. **Use validation** to prevent errors (required fields, min/max values)
4. **Set initialValue** for sensible defaults
5. **Use preview** to customize how items appear in lists
6. **Group related fields** using objects
7. **Test your schema** by creating content in Sanity Studio

---

## 📚 Current Schemas in Your Project

### 1. **Blog Post** (`blogPost`)
- Title, slug, excerpt
- Cover image
- Author, published date
- Category (Travel, Food, Tech, etc.)
- Tags
- Rich text content
- Featured toggle

### 2. **Landing Page** (`landingPage`)
- Hero section
- About section
- Services
- Newsletter
- Footer

---

## 🔗 Useful Resources

- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/presenting-block-text)

---

## 💡 Next Steps

1. **Start Sanity Studio**: `cd studio && pnpm dev`
2. **Create your first blog post**
3. **View it on your website**: `http://localhost:4321/blog`
4. **Customize schemas** to match your needs

Happy content creating! 🎉
