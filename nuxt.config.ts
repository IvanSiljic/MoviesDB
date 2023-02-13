// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
    ],
    app: {
        head: {
            title: "The Movie Database",
            link: [{
                rel: 'stylesheet', 
                href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
            }]
        },
    },
    runtimeConfig: {
        movieDBKey: process.env.MOVIE_DB_KEY,
    },
    css: [
        '@/assets/css/style.scss'
    ]
})
