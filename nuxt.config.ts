export default defineNuxtConfig({
  app: {
    head: {
      title: '联合国实习生岗位汇总',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
  ssr: false,
  routeRules: {
    '/api/*': { cache: { maxAge: 60 * 60 } },
    '/list': { ssr: false },
  },
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['@/assets/style/global.scss'],
  plugins: [{ src: '~/plugins/element-plus-icons.ts', mode: 'client' }],
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
