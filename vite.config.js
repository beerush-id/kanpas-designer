import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [ sveltekit() ],
  test: {
    include: [ 'src/**/*.{test,spec}.{js,ts}' ]
  },
  resolve: {
    alias: {
      '@components': resolve('./src/components'),
      '@utils': resolve('./src/utils'),
      '@services': resolve('./src/services'),
      '@actions': resolve('./src/actions'),
      '@templates': resolve('./src/templates'),
      '@data': resolve('./src/data'),
    }
  }
};

export default config;
