<script setup>
    import { useMoviesStore } from '../store/MoviesStore'
    import { storeToRefs } from 'pinia'

    const { getPopularMovies, getTopMovies } = useMoviesStore()
    const { popularMovies, topMovies } = storeToRefs(useMoviesStore())

    onMounted(async () => {
        await getTopMovies({ page: 1})
        await getPopularMovies({ page: 1})
    })
</script>

<template>
    <div class="container">
        <div class="contaier-movies">
            <NowPlayingMovies/>
        </div>

        <div class="container-movies">
            <h1 class="container-movies-title">Popular Movies</h1>
            <MovieCard v-for="m in popularMovies.results" :movie="m"></MovieCard>
        </div>
        
        <div class="container-movies">
            <h1 class="container-movies-title">Top rated</h1>
            <MovieCard v-for="m in topMovies.results" :movie="m"></MovieCard>
        </div>
    </div>
</template>


<style scoped lang="scss">
    .container{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        
        &-movies {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            max-width: 1500px;
            
            &-title {
                display: flex;
                justify-content: center;
                width: 100%;
            }
        }
    }
</style>