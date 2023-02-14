<script setup>
    import { useMovieStore } from '../../store/MovieStore'
    import { storeToRefs } from 'pinia'

    const { getSimilarById } = useMovieStore()
    const { similar } = storeToRefs(useMovieStore())
    const { id } = useRoute().params

    onMounted(async () => {
        await getSimilarById(id)
    })
</script>

<template>
    <Poster :movieId="id"/>
    <div class="container">
        <div class="container-cast">
            <h1>Movie Cast</h1>
            <div class="cast">
                <Cast :movieId="id" />
            </div>
        </div>
        
        <div class="container-similar">
            <h1>Similar Movies</h1>
            <div class="container-similar-overflow">
                <MovieCard v-for="m in similar" :movie="m" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;

        &-cast {
            max-width: 1500px;
        }

        &-similar {
            max-width: 1500px;

            &-overflow {
                display: flex;
                justify-content: flex-start;
                flex-direction: row;
                overflow-x: scroll;
                overflow-y: hidden;
                padding: 1rem;
            }
        }
    }
</style>