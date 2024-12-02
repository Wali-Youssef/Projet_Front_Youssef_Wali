// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
vite: {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/foundations/variables" as *;
          @use "@/assets/foundations/functions" as *;
          @use "@/assets/foundations/mixins" as *;
        `,
      },
    },
  },
}

  
})