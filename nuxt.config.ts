import { process } from "std-env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss"],

  runtimeConfig: {
    MONGO_URI: process.env.MONGODB_URI,
  },

  css: ["~/assets/css/main.css"],
});
