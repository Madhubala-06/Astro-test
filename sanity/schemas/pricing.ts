// Pricing Page Schema for Sanity

export default {
  name: 'pricing',
  title: 'Pricing Page',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
    },
    {
      name: 'pageDescription',
      title: 'Page Description',
      type: 'text',
    },
    {
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
            { name: 'ctaLink', type: 'url', title: 'Button Link' },
            {
              name: 'features',
              type: 'array',
              title: 'Features',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    },
    {
      name: 'faq',
      title: 'FAQ Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' },
          ],
        },
      ],
    },
  ],
};
