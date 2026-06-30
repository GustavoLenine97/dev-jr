import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const API_KEY = process.env.TMDB_KEY;

async function ImportMovie() {
    try {

        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie`,
            {
                params: {
                    api_key: API_KEY,
                    language: "pt-BR",
                    page: 1
                }
            }
        );

        const filmes = response.data.results;

        for (const filme of filmes) {

            const existe = await prisma.movie.findUnique({
                where: {
                    tmdbId: filme.id
                }
            });

            if (!existe) {

                await prisma.movie.create({
                    data: {
                        tmdbId: filme.id,
                        title: filme.title,
                        description: filme.overview,
                        poster: filme.poster_path,
                        backdrop: filme.backdrop_path,
                        year: filme.release_date
                            ? parseInt(filme.release_date.substring(0, 4))
                            : null,
                        rating: filme.vote_average,
                        category: "Popular",
                        type: "movie"
                    }
                });

                console.log(`${filme.title} salvo.`);
            }
        }

        console.log("Importação concluída.");

    } catch (error) {
        console.error(error);
    }
}

export default ImportMovie