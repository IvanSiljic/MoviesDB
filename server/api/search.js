export default defineEventHandler(async (event) => {
    const { movieDBKey } = useRuntimeConfig()

    const { q } = getQuery(event)

    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieDBKey}&query=${q}`)
    .then((response) => response.json())
    .then((data) => data)
    
    return {
      movies: data
    }
})