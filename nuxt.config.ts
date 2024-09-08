// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  experimental: { typedPages: true },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxt/eslint'],

  eslint: {
    config: {
      stylistic: true,
    },
  },

  i18n: {
    locales: ['en', 'fr'],
    strategy: 'prefix',
    defaultLocale: 'en',
    vueI18n: './i18n/i18n.config.ts',
  },
})
