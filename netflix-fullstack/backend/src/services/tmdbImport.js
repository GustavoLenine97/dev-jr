const API_KEY = process.env.TMDB_API_KEY; 
const API_BASE = "https://api.themoviedb.org/3";

const fetchTMDB = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);

    if (!req.ok) {
        throw new Error(`Erro na API do TMDB: ${req.status}`);
    }

    const json = await req.json();

    console.log("TMDB RAW:", json);

    return json;
};

const getMovieGenres = async () => {
    const data = await fetchTMDB(
        `/genre/movie/list?language=pt-BR&api_key=${API_KEY}`
    );

    return data.genres;
};

const getTVGenres = async () => {
    const data = await fetchTMDB(
        `/genre/tv/list?language=pt-BR&api_key=${API_KEY}`
    );

    return data.genres;
};

const getGenreNames = (genreIds, genres) => {
    if (!Array.isArray(genreIds)) {
        return '';
    }

    return genreIds
        .map(id => genres.find(genre => genre.id === id)?.name)
        .filter(Boolean)
        .join(', ');
};


const fetchPages = async (endpoint, totalPages = 10) => {
    const results = [];

    for (let page = 1; page <= totalPages; page++) {
        console.log(`Buscando página ${page}/${totalPages}...`);

        const separator = endpoint.includes("?") ? "&" : "?";

        const data = await fetchTMDB(
            `${endpoint}${separator}page=${page}&language=pt-BR&api_key=${API_KEY}`
        );

        if (data?.results) {
            results.push(...data.results);
        }
    }

    return results;
};

export const getAllMoviesFromTMDB = async () => {
    console.log("Iniciando importação do TMDB...");

    const movieGenres = await getMovieGenres();
    const tvGenres = await getTVGenres();

    const originals = await fetchPages(
        `/discover/tv?with_network=213`,
        10
    );

    const trending = await fetchPages(
        `/trending/all/week`,
        10
    );

    const topRated = await fetchPages(
        `/movie/top_rated`,
        10
    );

    const documentaries = await fetchPages(`/discover/movie?with_genres=99`, 20);

    const allMovies = [
        ...originals,
        ...trending,
        ...topRated,
        ...documentaries
    ];

    console.log("TOTAL BRUTO:", allMovies.length);

    // Remove duplicados
    const uniqueMovies = Array.from(
        new Map(
            allMovies.map(movie => [
                `${movie.media_type || "movie"}-${movie.id}`,
                movie
            ])
        ).values()
    );

    console.log("TOTAL ÚNICO:", uniqueMovies.length);

    return uniqueMovies.map(movie => {
        const isTV = movie.media_type === 'tv' || movie.name;

        const genres = isTV ? tvGenres : movieGenres;

        return {
            ...movie,
            genres: getGenreNames(movie.genre_ids, genres)
        };
    });
};