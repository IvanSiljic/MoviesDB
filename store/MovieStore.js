import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movieStore', {
    state: () => ({
        movies: ['Tenenat', 'Fight Club']
    })
})