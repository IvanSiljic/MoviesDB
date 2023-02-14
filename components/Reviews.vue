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

        <div class="review-bottom" v-html="marked(review.content)" />
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
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            padding-top: 1rem;
            width: calc(1500px - 6rem);
            max-width: calc(100vw - 7rem);
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