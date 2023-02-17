<script setup>
    const { text } = defineProps(['text'])
</script>

<template>
    <button class="genre">
        {{ text }}
    </button>
</template>

<style scoped lang="scss">
    .genre {
        cursor: pointer;
        margin: 0.3rem;
        padding: 0.7rem;
        border: unset;
        border-radius: 1rem;
        color: black;
        z-index: 1;
        background: white;
        position: relative;
        font-weight: 1000;
        font-size: 1rem;
        transition: all 250ms;
        overflow: hidden;                   
    }
    .genre:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0;
        border-radius: 15px;
        background-color: #212121;
        z-index: -1;
        -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
        box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
        transition: all 250ms
    }
    .genre:hover {
        color: white;
    }
    .genre:hover::before {
        width: 100%;
    }
</style>