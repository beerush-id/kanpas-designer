import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  resolve: {
    alias: {
      '@components': resolve('./src/lib/components'),
      '@utils': resolve('./src/lib/utils'),
      '@styles': resolve('./src/lib/styles'),
      '@services': resolve('./src/lib/services'),
      '@actions': resolve('./src/lib/actions'),
      '@templates': resolve('./src/templates'),
      '@data': resolve('./src/data'),
    },
  },
};

export default config;
