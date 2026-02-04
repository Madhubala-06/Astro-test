import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'layerpath-studio',
  title: 'Layerpath Website',

  // TODO: Replace with your project ID from sanity.io/manage
  projectId: 'odwnzl2n',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(), // For testing GROQ queries
  ],

  schema: {
    types: schemaTypes,
  },
})
