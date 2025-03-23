import { defineNuxtConfig } from 'nuxt/config';
import { resolve } from 'path';

export default defineNuxtConfig({
  // Extend the WooNuxt base theme
  extends: [resolve(__dirname, './woonuxt_base')],

  // Ensure custom components are detected
  components: [{ path: './app/components', pathPrefix: false }],

  // Nitro settings (adjust based on server capability)
  nitro: {
    prerender: {
      concurrency: 10,
      interval: 1000,
      failOnError: false,
    },
  },

  // Debugging: Log if Nuxt is loading the correct layers
  hooks: {
    'ready': (nuxt) => {
      console.log('✅ Loaded layers:', nuxt.options._layers);
    }
  }
});
