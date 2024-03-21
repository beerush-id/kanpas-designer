import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      '@components': './src/lib/components',
      '@components/*': './src/lib/components/*',
      '@utils': './src/lib/utils',
      '@utils/*': './src/lib/utils/*',
      '@styles': './src/lib/styles',
      '@styles/*': './src/lib/styles/*',
      '@services': './src/lib/services',
      '@services/*': './src/lib/services/*',
      '@actions': './src/lib/actions',
      '@actions/*': './src/lib/actions/*',
      '@templates': './src/templates',
      '@templates/*': './src/templates/*',
      '@data': './src/data',
      '@data/*': './src/data/*',
    },
  },
};

export default config;
