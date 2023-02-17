<script setup>
    import { storeToRefs } from 'pinia';
    import { useMoviesStore } from '../store/MoviesStore'

    const { type } = useRoute().params
    const { getPopularMovies, getTopMovies, getGenres } = useMoviesStore()
    const { genres } = storeToRefs(useMoviesStore())
    const movies = ref({})
    const filteredMovies = ref([])
    const page = ref(1)
    const activeGenre = ref([])
    
    onMounted(async () => {
        await getGenres()

        if (type == 'popular') {
            movies.value = await getPopularMovies({ page: page.value })
            movies.value = movies.value.movies.results
        } else if (type == 'top') {
            movies.value = await getTopMovies({ page: page.value })
            movies.value = movies.value.movies.results
        }
        filteredMovies.value = movies.value
    })

   const filterMovies = () => {
        filteredMovies.value = movies.value
       
        for (let i = 0; i < activeGenre.value.length; i++) {
           filteredMovies.value = filteredMovies.value.filter(movie => movie.genre_ids.includes(activeGenre.value[i].id))
        } 
    }

    const loadMore = async () => {
        let appendMovies = []
        
        page.value += 1

        if (type == 'popular') {
            appendMovies = await getPopularMovies({ page: page.value })
        } else if (type == 'top') {
            appendMovies = await getTopMovies({ page: page.value })
        }

        appendMovies = appendMovies.movies.results

        movies.value.push.apply(movies.value, appendMovies)

        filterMovies()
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
                    <button class="list-middle-left-genre active" v-for="genre in activeGenre" @click="removeGenre(genre)">
                        {{ genre.name }}
                    </button>
                </div>

                <div>
                    <button class="list-middle-left-genre" v-for="genre in genres" @click="addGenre(genre)">
                        {{ genre.name }}
                    </button>
                </div>
            </div>

            <div class="list-middle-right">
                <div class="movie-list" v-for="movie in filteredMovies" :to="`/movie/${movie.id}`">
                    <MovieListCard :movie="movie" />
                </div>
                <button class="list-middle-right-more" :disabled="page == 500" @click="loadMore">
                    Load More
                </button>
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

                &-genre {
                    cursor: pointer;
                    margin: 0.3rem;
                    padding: 0.7rem;
                    border: unset;
                    border-radius: 1rem;
                    color: black;
                    z-index: 1;
                    background: white;
                    position: relative;
                    font-weight: 1000;
                    font-size: 1rem;
                    transition: all 250ms;
                    overflow: hidden;                   
                }

                &-genre:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 0;
                    border-radius: 15px;
                    background-color: #212121;
                    z-index: -1;
                    -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
                    box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
                    transition: all 250ms
                }

                &-genre:hover {
                    color: white;
                }

                &-genre:hover::before {
                    width: 100%;
                }
            }

            &-right {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                flex-grow: 0;
                width: 100%;

                &-more {
                    display: flex;
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
