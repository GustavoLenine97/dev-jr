import express from "express";
import cors from "cors";
import axios from "axios";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});

app.get("/importar-filmes", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
            {
                params: {
                    api_key: process.env.TMDB_KEY,
                    language: "pt-BR",
                    page: 1
                }
            }
        );

        res.json(response.data.results);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});