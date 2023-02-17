<script setup>
    import { storeToRefs } from 'pinia';
    import { useMoviesStore } from '../store/MoviesStore'

    const router = useRouter()
    const { type } = useRoute().params
    const { genre } = useRoute().query
    const activeGenre = ref(genre?.split(','))
    const { getPopularMovies, getTopMovies, getGenres } = useMoviesStore()
    const { genres } = storeToRefs(useMoviesStore())
    const movies = ref([])
    const page = ref(1)
    const loadingList = ref(true)
    const loadingMore = ref(false)

    watch(activeGenre, () => {
        router.push({ query: {genre: activeGenre.value?.map(el => el.id).toString()} })
    }, { deep: true})
    
    onMounted(async () => {
        await getGenres()

        activeGenre.value = activeGenre.value !== undefined ? activeGenre.value.map(el => genres.value.find(genre => genre.id == el)) : []
        
        genres.value = genres.value.filter((el) => !activeGenre.value?.includes(el))

        getMovies(1)

        loadingList.value = false
    })

    const getMovies = async (page) => {
        let appendMovies = []

        if (type == 'popular') {
            appendMovies = await getPopularMovies({ page, genres: activeGenre.value.map(el => el.id).toString() })
        } else if (type == 'top') {
            appendMovies = await getTopMovies({ page, genres: activeGenre.value.map(el => el.id).toString() })
        }

        movies.value.push.apply(movies.value, appendMovies.movies.results)
    }

    const loadMore = async () => {
        loadingMore.value = true
        page.value += 1

        getMovies(page.value)
        
        loadingMore.value = false
    }

    const removeGenre = async (genre) => {
        page.value = 1
        loadingList.value = true

        genres.value.push(genre)
        genres.value = genres.value.sort((a, b) => a.name.localeCompare(b.name))

        activeGenre.value = activeGenre.value.filter((el) => el.id != genre.id)

        movies.value = []

        await getMovies(page.value)

        loadingList.value = false
    }

    const addGenre = async (genre) => {
        page.value = 1
        loadingList.value = true

        activeGenre.value.push(genre)
        activeGenre.value = activeGenre.value.sort((a, b) => a.name.localeCompare(b.name))

        genres.value = genres.value.filter((el) => el.id != genre.id)
        
        movies.value = []

        await getMovies(page.value)

        loadingList.value = false
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

                <div>
                    <Filter class="active" v-for="genre in activeGenre" @click="removeGenre(genre)" :text="genre.name" />
                </div>

                <div>
                    <Filter class="list-middle-left-genre" v-for="genre in genres" @click="addGenre(genre)" :text="genre.name" />
                </div>
            </div>
            
            <div class="list-middle-right">
                <LoadSpinner v-if="loadingList"/>
                <div class="movie-list" v-for="movie in movies" :to="`/movie/${movie.id}`">
                    <MovieListCard :movie="movie" />
                </div>
                <MoreButton :disabled="page == 500" @click="loadMore" :loading="loadingMore" text="Load More"/>
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

    .active {
        background: #212121;
        color: white;
    }
    
    .active:before {
        background-color: white;
    }
    
    .active:hover {
        color: black;
    }
</style>
