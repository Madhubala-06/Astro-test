import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Feature Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Feature Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
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
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        { type: 'block' }, // Rich text
        { type: 'image' },
      ],
    }),
  ],
})
