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
    <pre>
        {{ movie }}
    </pre>
</template>