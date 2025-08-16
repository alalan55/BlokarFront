// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_APP_API_URL || "https://localhost:7058/",
    },
  },
  modules: [
    "nuxt-toast",
    "@nuxt/icon",
    "@formkit/auto-animate/nuxt",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  // Disable SSR to run as SPA

  css: ["@/assets/main.css"],
});
