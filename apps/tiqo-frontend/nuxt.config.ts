// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  css: ["~/assets/css/global.css"],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {
        config: "./tailwind.config.ts",
      },
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
    "@nuxt/ui"
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:3000/shop-api",
        defaultOptions: {
          query: {
            fetchPolicy: "no-cache",
          }
        }
      },
    },
  },
});
