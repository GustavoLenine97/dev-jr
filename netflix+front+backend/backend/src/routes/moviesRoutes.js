import express from 'express'
import { PrismaClient } from '@prisma/client'
import { getAllMoviesFromTMDB } from '../services/tmdbImport.js'

const router = express.Router()
const prisma = new PrismaClient()

// LISTAR DO BANCO
router.get("/movies", async (req, res) => {

    const movies = await prisma.movies.findMany();

    const convert = (movie) => ({

        id: movie.id,

        title: movie.title,
        name: movie.title,
        original_title: movie.title,
        original_name: movie.title,

        overview: movie.description,

        poster_path: movie.poster,
        backdrop_path: movie.backdrop,

        vote_average: movie.rating,

        release_date: movie.year
            ? `${movie.year}-01-01`
            : null,

        first_air_date: movie.year
            ? `${movie.year}-01-01`
            : null,

        media_type: movie.type,

        genre_ids: [],

        genres: []
    });

    const category = (name) => ({
        slug: name,
        title:
            name === "originals" ? "Originais" :
            name === "trending" ? "Recomendados" :
            name === "action" ? "Ação" :
            name === "comedy" ? "Comédia" :
            name === "horror" ? "Terror" :
            "Romance",

        items: {
            results: movies
                .filter(m => m.category === name)
                .map(convert)
        }
    });

    res.json([
        category("originals"),
        category("trending"),
        category("action"),
        category("comedy"),
        category("horror"),
        category("romance")
    ]);

});

router.get("/movies/:id", async (req, res) => {

    const movie = await prisma.movies.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    if (!movie) {
        return res.status(404).json({
            error: "Filme não encontrado"
        });
    }

    res.json({

        id: movie.id,

        title: movie.title,
        name: movie.title,
        original_title: movie.title,
        original_name: movie.title,

        overview: movie.description,

        poster_path: movie.poster,
        backdrop_path: movie.backdrop,

        vote_average: movie.rating,

        release_date: movie.year
            ? `${movie.year}-01-01`
            : null,

        first_air_date: movie.year
            ? `${movie.year}-01-01`
            : null,

        number_of_seasons: 1,

        genres: [],

        media_type: movie.type

    });

}); 

// IMPORTAR DO TMDB PARA O BANCO

router.post('/movies/import', async (req, res) => {
    try {

        const movies = await getAllMoviesFromTMDB()

        const formatted = movies.map(movie => {

    const isTV = movie.name && !movie.title;

    return {
        title: movie.title || movie.name,
        description: movie.overview,
        poster: movie.poster_path,
        backdrop: movie.backdrop_path,

        year: Number(
            movie.release_date?.slice(0, 4) ||
            movie.first_air_date?.slice(0, 4) ||
            0
        ),

        rating: movie.vote_average,

        type: isTV ? "tv" : "movie",

        
        category:
            Array.isArray(movie.genre_ids) && movie.genre_ids.includes(28) ? "action" :
                Array.isArray(movie.genre_ids) && movie.genre_ids.includes(35) ? "comedy" :
                    Array.isArray(movie.genre_ids) && movie.genre_ids.includes(27) ? "horror" :
                        Array.isArray(movie.genre_ids) && movie.genre_ids.includes(10749) ? "romance" :
                            Array.isArray(movie.genre_ids) && movie.genre_ids.includes(99) ? "documentary" :
                                movie.name ? "originals" :
                                    "trending"

    };
});

        console.log("TOTAL FORMATADO:", formatted.length)

        const result = await prisma.movies.createMany({
            data: formatted,
            skipDuplicates: true
        })

        console.log("RESULTADO PRISMA:", result)

        return res.json({
            message: "Importação concluída",
            total: result.count
        })

    } catch (error) {
        console.log("ERRO PRISMA REAL:", error)
        return res.status(500).json({
            error: error.message,
            full: error
        })
    }
})


export default router