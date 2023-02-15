<script setup>
    import { useMovieStore } from '../../store/MovieStore'
    import { storeToRefs } from 'pinia'

    const { getSimilarById, getReviewsById } = useMovieStore()
    const { similar, reviews } = storeToRefs(useMovieStore())
    const { id } = useRoute().params

    onMounted(async () => {
        await getSimilarById(id)
        await getReviewsById(id)
    })
</script>

<template>
    <Poster :movieId="id"/>
    <div class="container">
        <div class="container-cast">
            <h1>Movie Cast</h1>
            <div class="container-cast-overflow">
                <Cast :movieId="id" />
            </div>
        </div>

        <div class="container-reviews">
            <h1>Reviews</h1>
            <div class="container-reviews-overflow">
                <Reviews v-for="review in reviews" :review="review" />
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
        
        h1 {
            padding-left: 1rem;
        }

        &-cast {
            width: 100%;
            max-width: 1500px;
            
            &-overflow {
                display: flex;
                justify-content: flex-start;
                flex-direction: row;
                overflow-x: scroll;
                overflow-y: hidden;
                padding: 1rem;
                padding-left: 0;
            }
        }

        &-reviews {
            width: 100%;
            max-width: 1500px;
            
            &-overflow {
                display: flex;
                justify-content: flex-start;
                flex-direction: row;
                overflow-x: scroll;
                overflow-y: hidden;
                padding: 1rem;
                padding-left: 0;
            }
        }

        &-similar {
            width: 100%;
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