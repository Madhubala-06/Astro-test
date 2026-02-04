import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pricing',
  title: 'Pricing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Simple, Transparent Pricing',
    }),
    defineField({
      name: 'pageDescription',
      title: 'Page Description',
      type: 'text',
    }),
    defineField({
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Plan Name' },
            { name: 'price', type: 'string', title: 'Price' },
            { name: 'billingPeriod', type: 'string', title: 'Billing Period' },
            { name: 'description', type: 'text', title: 'Plan Description' },
            { name: 'highlighted', type: 'boolean', title: 'Highlight This Plan' },
            { name: 'ctaText', type: 'string', title: 'Button Text' },
            { name: 'ctaLink', type: 'string', title: 'Button Link' },
            {
              name: 'features',
              type: 'array',
              title: 'Features',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    }),
  ],
})
