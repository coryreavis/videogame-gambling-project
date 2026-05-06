import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  base: '/videogame-gambling-project/',
  output: 'static',
});
