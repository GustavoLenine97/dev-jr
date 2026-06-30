import express from "express";
import userRoutes from "./src/routes/userRoutes.js"
import moviesRoutes from "./src/routes/moviesRoutes.js"
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(moviesRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
