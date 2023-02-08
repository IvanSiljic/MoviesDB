export default defineEventHandler((event) => {
    const { movieDBKey } = useRuntimeConfig()
    
    return {
      api: movieDBKey
    }
})