// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Real site URL, so share links and canonical URLs are not "localhost"
  site: 'https://astro-test-sigma.vercel.app',
  build: {
    // Put the small CSS file inside the HTML so it does not block the first paint
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
