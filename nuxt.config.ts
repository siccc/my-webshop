// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-vitest'
  ],
  app: {
    head: {
      title: 'My webshop',
      meta: [
        { name: 'description', content: 'A simple webshop example made with Nuxt 3 and Pinia.' }
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
});
