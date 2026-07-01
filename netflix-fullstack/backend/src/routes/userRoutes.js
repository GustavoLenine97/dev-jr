import express from "express";

const router = express.Router();

router.get("/usuarios", (req, res) => {
    res.send("Funcionando");
});

export default router;