// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  css: ["~/assets/css/global.css"],

  build: {
    transpile: ["gsap"]
  },

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxtjs/apollo",
    "@nuxt/ui",
    "@pinia/nuxt"
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:10000/shop-api",
        httpLinkOptions: {
          credentials: "include",
        },
        defaultOptions: {
          query: {
            fetchPolicy: "no-cache",
          }
        }
      },
    },
  },

  pinia: {
    storesDirs: ['./composables/stores/**']
  },
});