import { defineStore } from 'pinia'
import axios from 'axios'

export const useMoviesStore = defineStore('moviesStore', {
    state: () => ({
        popularMovies: [],
        topMovies: [],
        nowPlayingMovies: [],
        genres: []
    }),
    actions: {
        getPopularMovies(payload) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/movies/popular`, {
                    params: {
                        page: payload?.page,
                        genres: payload?.genres
                    }
                }).then(({ data }) => {
                    this.popularMovies = data?.movies
                    resolve(data)
                }).catch((err) => {
                  reject(err)
                })
              })
        },
        getTopMovies(payload) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/movies/top`, {
                    params: {
                        page: payload?.page,
                        genres: payload?.genres
                    }
                }).then(({ data }) => {
                    this.topMovies = data?.movies
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            })

        },
        getNowPlayingMovies() {
            return new Promise((resolve, reject) => {
                axios.get(`/api/movies/now_playing`).then(({ data }) => {
                    this.nowPlayingMovies = data?.movies
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            })

        },
        getGenres() {
            return new Promise((resolve, reject) => {
                axios.get(`/api/movies/genres`).then(({ data }) => {
                    this.genres = data?.genres.genres
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    }
})