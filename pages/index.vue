<script setup>
    import { useMovieStore } from '../store/MovieStore'

    const movieStore = useMovieStore()

    console.log(movieStore.movies)
</script>

<template>
    <div>
        <h1 v-for="m in movieStore.movies">
            {{ m }}
        </h1>
    </div>
</template>


<style scoped>

</style>