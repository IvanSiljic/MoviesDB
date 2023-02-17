<script setup>
    import { storeToRefs } from 'pinia';
    import { useMoviesStore } from '../store/MoviesStore'

    const { type } = useRoute().params
    const { getPopularMovies, getTopMovies, getGenres } = useMoviesStore()
    const { genres } = storeToRefs(useMoviesStore())
    const movies = ref({})
    const page = ref(1)
    const activeGenre = ref([])
    const loadingList = ref(true)
    const loadingMore = ref(false)

    onMounted(async () => {
        await getGenres()

        if (type == 'popular') {
            movies.value = await getPopularMovies({ page: page.value })
            movies.value = movies.value.movies.results
        } else if (type == 'top') {
            movies.value = await getTopMovies({ page: page.value })
            movies.value = movies.value.movies.results
        }

        loadingList.value = false
        loadMore.value = false
    })

    const filterMovies = async () => {
        loadingList.value = true
        let filterMovies = []

        for (let i = 1; i <= page.value; i++) {
            let appendMovies = []

            if (type == 'popular') {
                appendMovies = await getPopularMovies({ page: i })
            } else if (type == 'top') {
                appendMovies = await getTopMovies({ page: i })
            }
            
            filterMovies.push(...appendMovies.movies.results)
        }

        for (let i = 0; i < activeGenre.value.length; i++) {
            filterMovies = filterMovies.filter(movie => movie.genre_ids.includes(activeGenre.value[i].id))
        } 
        
        movies.value = filterMovies
        loadingList.value = false
    }

    const loadMore = async () => {
        loadingMore.value = true
        page.value += 1

        await filterMovies()
        loadingMore.value = false
    }

    const removeGenre = (genre) => {
        genres.value.push(genre)
        genres.value = genres.value.sort((a, b) => a.name.localeCompare(b.name))

        activeGenre.value = activeGenre.value.filter((el) => el.id != genre.id)

        filterMovies()
    }

    const addGenre = (genre) => {
        activeGenre.value.push(genre)
        activeGenre.value = activeGenre.value.sort((a, b) => a.name.localeCompare(b.name))

        genres.value = genres.value.filter((el) => el.id != genre.id)
        
        filterMovies()
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
                <MoreButton :disabled="page == 500" @click="loadMore" :loading="loadingMore"/>
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
