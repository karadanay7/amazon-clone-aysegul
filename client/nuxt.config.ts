// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    tsConfig: "./.nuxt/tsconfig.base.json",
  },
  components: true,

  modules: [
    "nuxt-icon",
    "@nuxtjs/robots",
    "@nuxt/image-edge",
    "nuxt-simple-sitemap",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],

  runtimeConfig: {
    mongodbURI: process.env.DATABASE,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Amazon clone",
      meta: [{ name: "Amazon clone" }],
      link: [
        {
          rel: "stylesheet",
          href: "https:/fonts.googleapis.com/icon?family=Material+Icons",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
      ],
    },
  },

  css: [
    "~/assets/css/font-awesome/css/all.css",
    "~/assets/css/default.css",
    "bootstrap/dist/css/bootstrap.min.css",
  ],

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    devProxy: {
      "/api": "http://localhost:3000",
    },
  },
});
