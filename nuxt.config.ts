// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxt/icon",
    "@formkit/auto-animate/nuxt",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
  ],
  // Disable SSR to run as SPA

  css: ["@/assets/main.css"],
});
