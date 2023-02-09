export default defineEventHandler(async (event) => {
    const { movieDBKey } = useRuntimeConfig()

    const { id } = event.context.params
    
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${movieDBKey}`)
    .then((response) => response.json())
    .then((data) => data)
    
    return {
      movies: data
    }
})