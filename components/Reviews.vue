<script setup>
    import { marked } from "marked"
    const { review } = defineProps(['review'])
</script>

<template>
    <div class="review">
        <div class="review-top">
            <img v-if="review?.author_details?.avatar_path !== null" :src="review.author_details.avatar_path.includes('http') ? review.author_details.avatar_path.slice(1) : 'https://image.tmdb.org/t/p/w500' + review.author_details.avatar_path" alt=""/>
            <div class="avatar" v-if="review?.author_details?.avatar_path === null">{{ review.author_details.username.slice(0, 1) }}</div>

            <span>
                Review by {{ review.author_details.username }}
            </span>

            <Rating v-if="review.author_details.rating !== null" :rating="review.author_details.rating" />
        </div>

        <div class="review-bottom">
            <div class="review-bottom-text" v-html="marked(review.content)"/>
            <NuxtLink class="review-more link" :to="review.url"> Read More</NuxtLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .review{
        display: flex;
        flex-direction: column;
        border-radius: 1rem;
        box-shadow: #aaa 0 0 15px;
        margin: 1rem;
        padding: 2rem;
        height: fit-content;

        &-top {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: fit-content;
            width: 100%;
            padding-bottom: 1rem;
            box-shadow: #ddd 0 1px 0;

            span {
                margin-right: 1rem;
                font-size: large;
                font-weight: bold;
            }

            img {
                width: 4rem;
                height: 4rem;
                border-radius: 2rem;
                margin-right: 1rem;
            }
        }

        &-bottom {
            position: relative;
            overflow: hidden;
            padding-top: 1rem;
            width: calc(1500px - 6rem);
            max-width: calc(100vw - 7rem);
            height: 8rem;
            overflow: hidden;
        }

        &-more {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            position: absolute;
            bottom: 0;
            left: 0;
            color: #555;
            background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(#fff, 0.8), white);
            width: 100%;
            height: 3rem;
        }
    }

    .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4rem;
        height: 4rem;
        border-radius: 2rem;
        margin-right: 1rem;
        color: white;
        background-color: #aaa;
        font-size: larger;
        text-shadow: #999 3px 3px 0;
        font-weight: bold;
    }
</style>