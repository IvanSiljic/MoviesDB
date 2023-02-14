<script setup>
    const { rating } = defineProps(['rating'])
</script>

<template>
    <div class="rating" :style="{
        backgroundColor: `rgb(${255 - rating * 10}, ${25.5 * rating}, 0)`
    }">
        {{ rating.toFixed(1) }}
    </div>
</template>

<style scoped lang="scss">
    .rating {
        background-color: #facc15;
        padding: 0.4rem;
        border-radius: 0.5rem;
        height: fit-content;
        width: fit-content;
        font-size: medium;
        color: white;
        font-weight: bold;
    }
</style>