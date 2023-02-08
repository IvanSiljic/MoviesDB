// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt'
    ],
    runtimeConfig: {
        movieDBKey: process.env.MOVIE_DB_KEY
    }
})
