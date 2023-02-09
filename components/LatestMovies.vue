<script setup>
    // import { useMovieStore } from '../store/MovieStore'
    // import { storeToRefs } from 'pinia'

    // const { getNowPlayingMovies } = useMovieStore()
    // const { nowPlayingMovies } = storeToRefs(useMovieStore())

    // onMounted(async () => {
    //     await getNowPlayingMovies()
    // })

    // console.log(nowPlayingMovies)
</script>

<template>
    <div :v-for="m in nowPlayingMovies">
        {{ m }}
    </div>
</template>