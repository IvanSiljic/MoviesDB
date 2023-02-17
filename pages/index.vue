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
        <div class="contaier-poster">
            <NowPlayingMovies/>
        </div>

        <div class="container-movies">
            <NuxtLink class="container-movies-title link" to="/popular-movies">Popular Movies</NuxtLink>

            <MovieCard v-for="m in popularMovies.results?.slice(0, 6)" :movie="m"></MovieCard>
            
            <NuxtLink class="container-movies-link link" to="/popular-movies">
                <MoreButton text="View More"/>
            </NuxtLink>
        </div>
        
        <div class="container-movies">
            <NuxtLink class="container-movies-title link" to="/top-movies">Top Movies</NuxtLink>

            <MovieCard v-for="m in topMovies.results?.slice(0, 6)" :movie="m"></MovieCard>
            
            <NuxtLink class="container-movies-link link" to="/top-movies">
                <MoreButton text="View More"/>
            </NuxtLink>
        </div>
    </div>
</template>


<style scoped lang="scss">
    .container{
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;

        &-movies {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 1rem;
            max-width: 1468px;
            overflow: hidden;
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
                display: flex;
                justify-content: center;
                width: 100%;
            }
        }
    }
</style>