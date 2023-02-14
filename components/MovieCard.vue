<template>
    <NuxtLink class="link" :to="`/movie/${movie.id}`">
        <div class="card">
            <div class="card-left">
                <img class="card-left-image" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="">
            </div>
            <div class="card-right">
                <div class="card-right-top">
                    <div>
                        {{ movie.title }}
                    </div>
                    <div class="card-right-top-rating" :style="{
                        backgroundColor: `rgb(${255 - movie?.vote_average * 10}, ${25.5 * movie?.vote_average}, 0)`
                    }">
                        {{  movie?.vote_average.toFixed(1) }}
                    </div>
                </div>
                <div>
                    <span>
                        Year
                    </span>
                    <div>
                        {{ movie.release_date.split('-')[0] }}
                    </div>
                </div>
                <div class="card-right-bottom">
                    <div class="card-right-bottom-overview">
                        {{ movie.overview }}
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
    const { movie } = defineProps(['movie'])
</script>

<style scoped lang="scss">
    .link {
        text-decoration: none;
        color: black;
    }
    .card {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
        margin: 1rem;
        margin-bottom: 5rem;
        box-shadow: #999 0px 5px 10px;
        border-radius: 1rem;
        height: 10rem;
        width: 25rem;

        span {
            font-size: small;
            color: #555;
        }

        &-left {
            position: relative;
            width: 10rem;
            flex-shrink: 0;
            margin-right: 1rem;

            &-image{
                border-radius: 1rem;
                position: absolute;
                width: 100%;
            }
        }

        &-right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: left;
            width: 100%;

            &-top {
                display: flex;
                justify-content: space-between;
                font-size: larger;
                font-weight: bold;

                &-rating {
                    background-color: #facc15;
                    padding: 0.4rem;
                    border-radius: 0.5rem;
                    height: fit-content;
                    font-size: medium;
                }
            }

            &-bottom {
                max-height: 3rem;
                
                &-overview {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    font-size: small;
                    color: #555;
                }
            }
        }
    }
</style>