import { defineStore } from 'pinia'
import axios from 'axios'

export const useMoviesStore = defineStore('moviesStore', {
    state: () => ({
        popularMovies: [],
        topMovies: [],
        nowPlayingMovies: []
    }),
    actions: {
        getPopularMovies() {
            return new Promise((resolve, reject) => {
                axios.get(`/api/movies/popular`).then(({ data }) => {
                    this.popularMovies = data?.movies
                    resolve(data)
                }).catch((err) => {
                  reject(err)
                })
              })
        },
        getTopMovies() {
            return new Promise((resolve, reject) => {
                axios.get(`/api/movies/top`).then(({ data }) => {
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

        }
    }
})