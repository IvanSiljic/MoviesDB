import axios from "axios"

export default defineEventHandler(async (event) => {
    const { movieDBKey } = useRuntimeConfig()
    const { page } = getQuery(event)
    
    const data = await axios.get('https://api.themoviedb.org/3/movie/top_movies', {
      params: {
        api_key: movieDBKey,
        page: page
      }
    })
    .then((data) => data.data)
    
    return {
      movies: data
    }
})