<script setup>
    import { useMoviesStore } from '../../store/MoviesStore'
    import { storeToRefs } from 'pinia'

    const { type, page} = useRoute().params
    const { getPopularMovies, getTopMovies, getGenres } = useMoviesStore()
    const { popularMovies, topMovies, genres } = storeToRefs(useMoviesStore())

    onMounted(async () => {
        await getGenres()

        if (type == 'popular') {
            await getPopularMovies({ page })
        } else if (type == 'top') {
            await getTopMovies({ page })
        }
    })
</script>

<template>
    <div class="list">
        <div class="list-top">
            <h1>
                {{ type == 'popular' ? 'Most Popular' : 'Top Rated'}}
            </h1>
        </div>

    
        <div class="list-middle">
            <div class="list-middle-left">
                <h2>Filter by genre</h2>
                <div class="list-middle-left-genre" v-for="genre in genres">
                    {{ genre.name }}
                </div>
            </div>

            <div class="list-middle-right">
                <NuxtLink class="list-middle-right-movie link" v-for="movie in type == 'popular' ? popularMovies.results : topMovies.results" :to="`/movie/${movie.id}`">
                    <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="" />
                    
                    <div class="list-middle-right-movie-right">
                        {{ movie.title }}
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        width: 100%;
        
        &-top {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #0d253f;
            padding-top: 3rem;
            width: 100%;
            color: white;
        }

        &-middle {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: row;
            max-width: 1500px;

            &-left {
                display: flex;

                &-genre {
                    padding: 1rem;
                }
            }
            
            &-right {
                
                &-movie{
                    display: flex;
                    padding: 1rem;
                    width: 100%;
                    border-radius: 1rem;
                    
                    img {
                        width: 10rem;
                        border-radius: 1rem;
                    }

                    &-right {
                        padding: 1rem;
                    }
                }

                &-movie:hover {
                    background-color: #eee;
                }
                
                &-movie:active {
                    background-color: #ccc;
                }
            }
            
        }
    }
</style>