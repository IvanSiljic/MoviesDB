<script setup>
    import { useMovieStore } from '../store/MovieStore'
    import { storeToRefs } from 'pinia'
    import profileSVG from '/profile.svg'

    const { getCreditsById } = useMovieStore()
    const { cast } = storeToRefs(useMovieStore())
    const { movieId } = defineProps(['movieId'])

    onMounted(async () => {
        await getCreditsById(movieId)
    })
</script>

<template>
    <div class="card" v-for="actor in cast">
        <img :src="`${ actor.profile_path ? 'https://image.tmdb.org/t/p/w500/' + actor.profile_path : profileSVG}`" alt=""/>
        <div class="card-text">
            <div class="card-text-name">
                {{ actor.name }}
            </div>
            <div class="card-text-character">
                {{ actor.character }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .card {
        margin: 1rem;
        height: 24rem;
        border-radius: 1rem;
        box-shadow: #aaa 0 0 15px;

        img {
            border-radius: 1rem 1rem 0 0;
            width: 200px;
            height: 300px;
        }

        &-text {
            padding: 0.7rem;
            padding-bottom: 0.8rem;
            
            &-name {
                font-weight: bold;
                font-size: large;
                margin-bottom: 0.2rem;
            }
            
            &-character {
                font-weight: lighter;
                font-size: medium;
            }
        }
    }
</style>