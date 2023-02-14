<script setup>
    const { id } = useRoute().params
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
    }
</style>