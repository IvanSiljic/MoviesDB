<script setup>
    const { movie } = defineProps(['movie'])
</script>

<template>
    <NuxtLink class="movie link" :to="'/movie/' + movie.id">
        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="" />
        
        <div class="movie-right">
            <div class="movie-right-top">
                <div>
                    {{ movie.title }}
                </div>
                
                <Rating :rating="movie.vote_average" />
            </div>
            <div>
                <span>
                    Year
                </span>
                <div>
                    {{ movie.release_date.split('-')[0] }}
                </div>
            </div>
            <div class="movie-right-bottom">
                <div class="movie-right-bottom-overview">
                    {{ movie.overview }}
                </div>
            </div>    
        </div>
    </NuxtLink>
</template>

<style scoped lang="scss">
    .movie{
        display: flex;
        padding: 0.5rem;
        border-radius: 1rem;
        box-shadow: #999 0px 0px 10px;
        margin: 1rem;
        
        img {
            width: 10rem;
            border-radius: 1rem;
        }
        
        &-right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: left;
            width: 100%;
            padding: 1rem;

            span {
                font-size: small;
                color: #555;
            }

            &-top {
                display: flex;
                justify-content: space-between;
                font-size: larger;
                font-weight: bold;
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
    
    .movie:hover {
        background-color: #eee;
    }
    
    .movie:active {
        background-color: #ccc;
    }
</style>