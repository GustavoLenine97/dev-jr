const API_BASE = "http://localhost:3000";

const api = {

  getHomeList: async () => {
    const res = await fetch(`${API_BASE}/movies`);
    const movies = await res.json();

    return [
      {
        slug: "all",
        title: "Filmes do Banco de Dados",
        items: { results: movies }
      }
    ];
  },

  getMovieInfo: async (movieId) => {
    const res = await fetch(`${API_BASE}/movies`);
    const movies = await res.json();

    return movies.find(movie => movie.id === movieId) || null;
  }

};

export default api;