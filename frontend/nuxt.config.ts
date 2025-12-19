import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { 
    enabled: true 
  },
  css: ['./app/assets/css/main.css'],
  modules: ['@nuxt/image'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    public: {
      appTitle: 'Nuxt Sanity Movies',
      sanity: {
        projectId: process.env.NUXT_SANITY_PROJECT_ID,
        dataset: process.env.NUXT_SANITY_DATASET,
        apiVersion: process.env.NUXT_SANITY_API_VERSION || '2024-01-01',
      },
      sanityVisualEditing: {
        studioUrl: process.env.NUXT_SANITY_STUDIO_URL || 'http://localhost:3333',
        token: process.env.NUXT_SANITY_API_READ_TOKEN || '',
      }
    }
  },
  image: {
    quality: 70,
    sanity: {
      projectId: process.env.NUXT_SANITY_PROJECT_ID!,
      dataset: process.env.NUXT_SANITY_DATASET!,
    }
  },
  app: {
    pageTransition: { 
      name: 'page', 
      mode: 'out-in' 
    },
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Nuxt Sanity Movies',
      meta: [
        { 
          name: 'description', 
          content: 'FAFO Demo for Nuxt v4 with Sanity CMS integration.'
        }
      ],
      link: [
        { 
          rel: 'shortcut icon', 
          type: 'image/png', 
          href: '/favicon.png?v=1'
        },
      ],
    }
  }
})