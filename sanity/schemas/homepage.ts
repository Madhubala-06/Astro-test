// Homepage Schema for Sanity
// This defines what fields the marketing team can edit

export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline on homepage',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'Supporting text below the headline',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
    },
    {
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text for the main call-to-action button',
    },
    {
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'url',
    },
    {
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
    },
    {
      name: 'pathAiBanner',
      title: 'Path AI Banner',
      type: 'object',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Banner' },
        { name: 'title', type: 'string', title: 'Banner Title' },
        { name: 'description', type: 'text', title: 'Banner Description' },
        { name: 'link', type: 'url', title: 'Banner Link' },
      ],
    },
  ],
};
