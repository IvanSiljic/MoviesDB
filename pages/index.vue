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
            <NuxtLink class="container-movies-title link" to="/movies/popular?page=1">Popular Movies</NuxtLink>

            <MovieCard v-for="m in popularMovies.results" :movie="m"></MovieCard>
            
            <NuxtLink class="container-movies-link link" to="/movies/popular?page=1">View More</NuxtLink>
        </div>
        
        <div class="container-movies">
            <h1 class="container-movies-title">Top rated</h1>
            <MovieCard v-for="m in topMovies.results" :movie="m"></MovieCard>
            <NuxtLink class="container-movies-link link" to="/movies/top?page=1">View More</NuxtLink>
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
            overflow: hidden;
            height: 40rem;
            position: relative;
            
            &-title {
                display: flex;
                justify-content: center;
                width: 100%;
                font-size: 2rem;
                font-weight: bold;
                margin: 1.5rem 0;
            }

            &-link {
                position: absolute;
                display: flex;
                justify-content: center;
                bottom: 0;
                font-size: 2rem;
                color: black;
                text-shadow: white 0 0 15px;
                width: 100%;
                height: 4rem;
                background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(255, 255, 255, 0.8), white);
            }
        }
    }
</style>