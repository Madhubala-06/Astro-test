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
      description: 'Main headline on the homepage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      description: 'Supporting text below the headline',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Start Free Trial',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/signup',
    }),
    defineField({
      name: 'features',
      title: 'Features Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Feature Title' },
            { name: 'description', type: 'text', title: 'Feature Description' },
            { name: 'icon', type: 'image', title: 'Feature Icon' },
          ],
        },
      ],
    }),
    defineField({
      name: 'pathAiBanner',
      title: 'Path AI Banner',
      type: 'object',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Banner', initialValue: true },
        { name: 'title', type: 'string', title: 'Banner Title' },
        { name: 'description', type: 'text', title: 'Banner Description' },
        { name: 'link', type: 'string', title: 'Banner Link' },
      ],
    }),
  ],
})
