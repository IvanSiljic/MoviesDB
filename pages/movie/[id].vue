<script setup>
    import { useMovieStore } from '../../store/MovieStore'
    import { storeToRefs } from 'pinia'
    
    
    const { getMovieById } = useMovieStore()
    const { movie } = storeToRefs(useMovieStore())
    const { id } = useRoute().params

    onMounted(async () => {
        await getMovieById(id)
    })
</script>

<template>
    <div class="backdrop" :style="{backgroundImage: 'url(https://image.tmdb.org/t/p/w1280/' + movie?.backdrop_path + ')'}">
        <div class="backdrop-cover">
            <div class="backdrop-cover-left">
                <img :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`" alt="">
            </div>
            <div class="backdrop-cover-right">
                <span class="backdrop-cover-right-title">{{ movie?.title }}
                    <span>{{ `(${movie?.release_date.split('-')[0]})` }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .backdrop {
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        
        &-cover {
            display: flex;
            align-items: center;
            background-image: linear-gradient(to right, rgba(#181818, 0.8), rgba(#181818, 0.5));
            height: 100%;
            width: 100%;
            padding: 6rem;
            padding-bottom: 2rem;
            
            &-left {
                
                img {
                    width: 15rem;
                    border-radius: 1rem;
                    box-shadow: #181818 0 0 15px;
                }
            }

            &-right {
                
                &-title {
                    color: white;
                    margin: 2rem;
                    font-size: 1.5rem;
                    text-shadow: black 0 0 5px;
                    font-weight: bold;

                    span {
                        color: #aaa;
                        font-weight: normal;
                    }
                }
            }
        }

    }
</style>