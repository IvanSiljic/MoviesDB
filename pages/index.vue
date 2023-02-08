<script setup>
    import { useMovieStore } from '../store/MovieStore'
    import { storeToRefs } from 'pinia'
    import MovieCard from '../components/MovieCard.vue'

    const { getPopularMovies, getTopMovies } = useMovieStore()
    const { popularMovies, topMovies } = storeToRefs(useMovieStore())

    onMounted(async () => {
        await getTopMovies()
        await getPopularMovies()
    })
</script>

<template>
    <h1 class="sectionTitle">Popular Movies</h1>
    <div class="movieSlider">
        <MovieCard v-for="m in popularMovies.results" :movie="m"></MovieCard>
    </div>

    <h1 class="sectionTitle">Top rated</h1>
    <div class="movieSlider">
        <MovieCard v-for="m in topMovies.results" :movie="m"></MovieCard>
    </div>
</template>


<style scoped>
    .sectionTitle{
        display: block;
        padding-left: 5rem;
    }
    .movieSlider{
        display: flex;
    }
</style>