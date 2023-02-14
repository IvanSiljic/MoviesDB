import { defineStore } from 'pinia'
import axios from 'axios'

export const useMovieStore = defineStore('movieStore', {
    state: () => ({
        movie: null,
        crew: null,
        cast: null,
        reviews: null
    }),
    actions: {
        getMovieById(id) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/movie/${id}`).then(({ data }) => {
                    this.movie = data?.movie
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        getCreditsById(id) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/movie/credits/${id}`).then(({ data }) => {
                    this.crew = data?.credits?.crew
                    this.cast = data?.credits?.cast
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        getReviewsById(id) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/movie/reviews/${id}`).then(({ data }) => {
                    this.reviews = data?.credits?.results
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    }
})