import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'photoAlbum',
  title: 'Photo Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., "Himalaya Trip", "Paris 2024", "Street Photography"'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Album Description',
      type: 'text',
      rows: 3,
      description: 'Short description of this photo collection',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main image to represent this album',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'When these photos were taken',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where these photos were taken',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Album',
      type: 'boolean',
      description: 'Show this album prominently on photography page',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Tags like "nature", "portrait", "landscape", etc.',
    }),
  ],
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      location: 'location',
    },
    prepare(selection) {
      const { title, location } = selection
      return {
        ...selection,
        subtitle: location || 'No location',
      }
    },
  },
})
