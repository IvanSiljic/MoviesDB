<script setup>
    import { useMoviesStore } from '../store/MoviesStore'

    const { type } = useRoute().params
    const { getPopularMovies, getTopMovies, getGenres } = useMoviesStore()
    const movies = ref({})
    const page = ref(1)

    onMounted(async () => {
        await getGenres()
        
        if (type == 'popular') {
            movies.value = await getPopularMovies({ page: page.value })
            movies.value = movies.value.movies.results
        } else if (type == 'top') {
            movies.value = await getTopMovies({ page: page.value })
            movies.value = movies.value.movies.results
        }
    })

    const loadMore = async () => {
        page.value += 1

        let appendMovies

        if (type == 'popular') {
            appendMovies = await getPopularMovies({ page: page.value })
        } else if (type == 'top') {
            appendMovies = await getTopMovies({ page: page.value })
        }

        movies.value.push.apply(movies.value, appendMovies.movies.results)
    }
</script>

<template>
    <div class="list">
        <div class="list-top">
            <h1>
                {{ type == 'popular' ? 'Most Popular' : 'Top Rated'}}
            </h1>
        </div>

    
        <div class="list-middle">
            <!-- <div class="list-middle-left">
                <h2>Filter by genre</h2>
                <div class="list-middle-left-genre" v-for="genre in genres">
                    {{ genre.name }}
                </div>
            </div> -->

            <div class="list-middle-right">
                <div class="link" v-for="movie in movies" :to="`/movie/${movie.id}`">
                    <MovieListCard :movie="movie" />
                </div>
            </div>
        </div>

        <button class="list-more" :disabled="page == 500" @click="loadMore">
            Load More
        </button>
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
            width: 100%;
            max-width: 1500px;

            &-left {
                display: flex;

                &-genre {
                    padding: 1rem;
                }
            }
        }

        &-more {
            align-items: center;
            background-color: #FFFFFF;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: .25rem;
            box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
            box-sizing: border-box;
            color: rgba(0, 0, 0, 0.85);
            cursor: pointer;
            display: inline-flex;
            font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
            font-size: 16px;
            font-weight: 600;
            justify-content: center;
            line-height: 1.25;
            min-height: 3rem;
            padding: calc(.875rem - 1px) calc(1.5rem - 1px);
            text-decoration: none;
            transition: all 250ms;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            vertical-align: baseline;
            width: auto;        
        }

        &-more:hover,
        &-more:focus {
            border-color: rgba(0, 0, 0, 0.15);
            box-shadow: rgba(0, 0, 0, 0.1) 0 0 15px;
            color: rgba(0, 0, 0, 0.65);
        }

        &-more:hover {
            transform: translateY(-1px);
        }

        &-more:active {
            background-color: #F0F0F1;
            border-color: rgba(0, 0, 0, 0.15);
            box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
            color: rgba(0, 0, 0, 0.65);
            transform: translateY(0);
        }
    }
</style>