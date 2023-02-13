<script setup>
    import { useMovieStore } from '../store/MovieStore'
    import { storeToRefs } from 'pinia'
    
    const { getMovieById } = useMovieStore()
    const { movie } = storeToRefs(useMovieStore())
    const { movieId } = defineProps(['movieId'])

    onMounted(async () => {
        await getMovieById(movieId)
    })
</script>

<template>
    <div class="backdrop" :style="{backgroundImage: 'url(https://image.tmdb.org/t/p/w1280/' + movie?.backdrop_path + ')'}">
        <div class="backdrop-cover">
            <div class="backdrop-cover-left">
                <img :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`" alt="">
            </div>
            <div class="backdrop-cover-right">
                <div class="backdrop-cover-right-title">
                    {{ movie?.title }}
                    <span>{{ `(${movie?.release_date.split('-')[0]})` }}</span>
                    <span class="backdrop-cover-right-title-subtitle">
                        <div v-for="genre in movie?.genres">
                            {{ genre.name + ","}} &nbsp;
                        </div>
                        <div>
                            {{ `${Math.floor(movie?.runtime / 60)}h ${movie?.runtime % 60}m` }}
                        </div>
                    </span>
                </div>
                <div class="backdrop-cover-right-rating" :style="{
                    backgroundColor: `rgb(${255 - movie?.vote_average * 10}, ${25.5 * movie?.vote_average}, 0)`
                }">
                    {{ movie?.vote_average.toFixed(1) }}
                </div>
                <div class="backdrop-cover-right-tagline">
                    {{ movie?.tagline }}
                </div>
                <div class="backdrop-cover-right-overview">
                    <h2>Overview</h2>
                    {{ movie?.overview }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .backdrop {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        
        &-cover {
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: linear-gradient(to right, rgba(#181818, 0.8), rgba(#181818, 0.5));
            padding: 6rem;
            padding-bottom: 2rem;
            width: 100%;
            
            &-left {
                margin-right: 3rem;
                
                img {
                    width: 15rem;
                    border-radius: 1rem;
                    box-shadow: #181818 0 0 15px;
                }
            }

            &-right {
                max-width: 1000px;
                
                &-title {
                    color: white;
                    font-size: 1.5rem;
                    text-shadow: black 0 0 5px;
                    font-weight: bold;
                    margin-bottom: 1rem;

                    span {
                        color: #aaa;
                        font-weight: normal;
                    }

                    &-subtitle {
                        display: flex;
                        
                        div {
                            font-size: 1rem;
                            font-weight: 100;
                        }
                    }
                }

                &-rating {
                    padding: 0.5rem;
                    margin-bottom: 1rem;
                    border-radius: 0.5rem;
                    max-width: fit-content;
                    font-size: medium;
                    font-weight: bold;
                    color: white;
                }

                &-tagline {
                    font-style: italic;
                    color: #aaa;
                }

                &-overview {
                    color: #aaa;
                    font-weight: lighter;

                    h2 {
                        color: white;
                        padding: 0;
                        margin-bottom: 0.5rem;
                    }
                }
            }
        }

    }
</style>