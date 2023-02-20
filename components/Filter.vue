<script setup>
    import { storeToRefs } from 'pinia';
    import { useMoviesStore } from '../store/MoviesStore'

    const router = useRouter()
    const { genre } = useRoute().query
    const activeGenre = ref()
    const { getGenres } = useMoviesStore()
    const { genres } = storeToRefs(useMoviesStore())
    const loading = ref(true)
    
    onMounted(async () => {
        await getGenres()

        activeGenre.value = activeGenre.value !== undefined && activeGenre.value[0] !== '' ? activeGenre.value.map(el => genres.value.find(genre => genre.id == el)) : []
        
        genres.value = genres.value.filter((el) => !activeGenre.value?.includes(el))

        loading.value = false
    })

    const removeGenre = (genre) => {
        genres.value.push(genre)
        genres.value = genres.value.sort((a, b) => a.name.localeCompare(b.name))

        activeGenre.value = activeGenre.value.filter((el) => el.id != genre.id)
        
        router.push({
            query: {
                genre: activeGenre.value.map(el => el.id).toString()
            }
        })
    }

    const addGenre = (genre) => {
        activeGenre.value.push(genre)
        activeGenre.value = activeGenre.value.sort((a, b) => a.name.localeCompare(b.name))

        genres.value = genres.value.filter((el) => el.id != genre.id)
        
        router.push({
            query: {
                genre: activeGenre.value.map(el => el.id).toString()
            }
        })
    }
</script>

<template>
    <LoadSpinner v-if="loading" />
    <div>
        <button class="genre active" v-for="genre in activeGenre" @click="removeGenre(genre)">
            {{ genre.name }}
        </button>
    </div>
    <div>
        <button class="genre" v-for="genre in genres" @click="addGenre(genre)">
            {{ genre.name }}
        </button>
    </div>
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
    .active {
        background: #212121;
        color: white;
    }
    
    .active:before {
        background-color: white;
    }
    
    .active:hover {
        color: black;
    }
</style>