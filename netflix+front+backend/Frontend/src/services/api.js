const API_BASE = "http://localhost:3000";

const basicFetch = async (endpoint) => {
    const req = await fetch(API_BASE + endpoint);
    return await req.json();
};

export default {

    getHomeList: async () => {
        return await basicFetch("/movies");
    },

    getMovieInfo: async (movieId) => {
        return await basicFetch(`/movies/${movieId}`);
    }

};