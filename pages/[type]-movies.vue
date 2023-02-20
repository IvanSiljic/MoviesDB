<script setup>
    import { useMoviesStore } from '../store/MoviesStore'

    const route = useRoute()
    const { type } = route.params
    let { genre } = route.query
    const { getPopularMovies, getTopMovies } = useMoviesStore()
    const movies = ref([])
    const page = ref(1)
    const totalPages = ref(0)
    const loadingList = ref(true)
    const loadingMore = ref(false)

    watch(() => route.query, (query) => {
        movies.value = []

        genre = query.genre
        
        getMovies(1)
    })
    
    onMounted(async () => {
        await getMovies(1)

        loadingList.value = false
    })

    const getMovies = async (reqPage) => {
        let appendMovies = []

        if (type == 'popular') {
            appendMovies = await getPopularMovies({ page: reqPage, genres: genre })
        } else if (type == 'top') {
            appendMovies = await getTopMovies({ page: reqPage, genres: genre })
        }

        page.value = appendMovies.movies.page
        totalPages.value = appendMovies.movies.total_pages

        movies.value.push.apply(movies.value, appendMovies.movies.results)
    }

    const loadMore = async () => {
        loadingMore.value = true
        page.value += 1

        console.log(page.value)

        await getMovies(page.value)
        
        loadingMore.value = false
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
            <div class="list-middle-left">
                <h2>Filter by genre</h2>

                <Filter class="list-middle-left-genre" />
            </div>
            
            <div class="list-middle-right">
                <LoadSpinner v-if="loadingList"/>
                <div class="movie-list" v-for="movie in movies" :to="`/movie/${movie.id}`">
                    <MovieListCard :movie="movie" />
                </div>
                <MoreButton :disable="page === totalPages" @click="loadMore" :loading="loadingMore" text="Load More"/>
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
            width: 100%;
            max-width: 1500px;
            padding-top: 1rem;

            &-left {
                display: flex;
                align-items: center;
                flex-direction: row;
                flex-wrap: wrap;
                width: 100%;
                max-width: 20rem;
                box-shadow: #999 0 0 15px;
                border-radius: 1rem;
                margin: 1rem;
                padding: 1rem;

                h2 {
                    width: 100%;
                    margin: 0;
                    padding: 1rem;
                    margin-bottom: 0.2rem;
                    border-bottom: #ddd 1px solid;
                }
            }

            &-right {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                flex-grow: 0;
                width: 100%;
            }
        }
    }
    .movie-list {
        width: 100%;
    }
</style>
