// @ts-check
import { defineConfig } from 'astro/config';

import db from '@astrojs/db';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://zenon-skyscanner.github.io',
  base: '/ai-unlocked-build-starter-zz-test',
  integrations: [db(), react()],
  vite: {
    plugins: [tailwindcss()]
  }
});