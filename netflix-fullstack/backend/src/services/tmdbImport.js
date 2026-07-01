const API_KEY = "22104b106c21db0c7bb530fe1228ee35";
const API_BASE = "https://api.themoviedb.org/3";

const fetchTMDB = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`)
    const json = await req.json()

    console.log("TMDB RAW:", json)

    return json
}

export const getAllMoviesFromTMDB = async () => {

    const originals = await fetchTMDB(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
    const trending = await fetchTMDB(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
    const topRated = await fetchTMDB(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)

    return [
        ...(originals?.results || []),
        ...(trending?.results || []),
        ...(topRated?.results || [])
    ]
}