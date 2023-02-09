<script setup>
    import { useMovieStore } from '../store/MovieStore'
    import { storeToRefs } from 'pinia'

    const { getNowPlayingMovies } = useMovieStore()
    const { nowPlayingMovies } = storeToRefs(useMovieStore())
    const activeSlide = ref(0)
    const windowWidth = ref(null)

    onMounted(async () => {
        await getNowPlayingMovies()
        windowWidth.value = document.querySelector(".carousel").offsetWidth
    })
    
    const onSlideNext = () => {
        activeSlide.value++
    }

    const onSlideBefore = () => {
        activeSlide.value += -1
    }
</script>

<template>
    <div class="carousel">
        <div class="button">
            <button @click="onSlideBefore">
                <i class="material-symbols-rounded md-48">arrow_back_ios</i>
            </button>
            <button @click="onSlideNext">
                <i class="material-symbols-rounded">arrow_forward_ios</i>
            </button>
        </div>
        <div class="carousel-inner" :style="{transform: 'translateX(-' + (windowWidth * activeSlide) + 'px)'}">
            <div class="carousel-inner-card" v-for="movie in nowPlayingMovies.results" :key="movie">
                <img :src="`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .carousel {
        display: flex;
        align-items: center;
        width: 100%;
        max-width: 1500px;
        overflow: hidden;

        &-inner {
            white-space: nowrap;
            transition: transform 0.2s;

            &-card {
                width: 100%;
                display: inline-flex;
                
                img {
                    width: 100%;
                }
            }
        }
    }

    .button {
        display: flex;
        justify-content: space-between;
        position: absolute;
        z-index: 10;
        width: inherit;
        max-width: 1500px;
        height: inherit;
    }

    button {
        color: #fff;
        margin: 0.5rem;
        padding: 0;
        border: none;
        background-color: rgba($color: #000000, $alpha: 0);

        i {
            font-size: 3rem;
        }
    }
</style>