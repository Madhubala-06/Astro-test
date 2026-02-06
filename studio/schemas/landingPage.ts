import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline (e.g., "Hey, we\'re Bilog.")',
      initialValue: "Hey, we're Bilog.",
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Short tagline below headline',
      initialValue: 'Checkout trends, travel tips, and tech news.',
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary CTA Text',
      type: 'string',
      initialValue: 'Read My Blog',
    }),
    defineField({
      name: 'primaryCtaLink',
      title: 'Primary CTA Link',
      type: 'string',
      initialValue: '/blog',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Text',
      type: 'string',
      initialValue: 'Learn More',
    }),

    // About Section
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
      initialValue: 'About Me',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Description',
      type: 'text',
      rows: 3,
      description: 'Short bio (2-3 sentences)',
      initialValue: "I'm a passionate developer and writer who loves sharing knowledge and experiences. Through this blog, I explore the intersection of technology, design, and creativity.",
    }),
    defineField({
      name: 'aboutCtaText',
      title: 'About CTA Text',
      type: 'string',
      initialValue: 'Read My Posts',
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Image (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // What I Do Section
    defineField({
      name: 'whatIDoTitle',
      title: 'What I Do Section Title',
      type: 'string',
      initialValue: 'What I Do',
    }),
    defineField({
      name: 'services',
      title: 'Services/Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'icon', 
              type: 'string', 
              title: 'Icon (emoji)', 
              initialValue: '💻' 
            },
            { 
              name: 'title', 
              type: 'string', 
              title: 'Service Title',
              placeholder: 'e.g., Development'
            },
            { 
              name: 'description', 
              type: 'text', 
              title: 'Description',
              rows: 2,
              placeholder: 'Short description of what you do'
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              icon: 'icon'
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: `${icon} ${title}`,
                subtitle: subtitle
              }
            }
          }
        },
      ],
    }),

    // Newsletter Section (Optional)
    defineField({
      name: 'showNewsletter',
      title: 'Show Newsletter Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'newsletterTitle',
      title: 'Newsletter Title',
      type: 'string',
      initialValue: 'Stay Updated',
    }),
    defineField({
      name: 'newsletterDescription',
      title: 'Newsletter Description',
      type: 'text',
      rows: 2,
      initialValue: 'Get the latest posts on travel, tech, and design straight to your inbox.',
    }),

    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      initialValue: 'Travel • Tech • Design',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'platform', 
              type: 'string', 
              title: 'Platform',
              options: {
                list: [
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Other', value: 'other' },
                ]
              }
            },
            { name: 'url', type: 'url', title: 'URL' },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url'
            }
          }
        },
      ],
    }),
  ],
})
