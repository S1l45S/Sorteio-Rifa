require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express());

const PORT = process.env.PORT || 3000;

const DATA_SORTEIO = new Date("2026-04-01T20:00:00").getTime();
const BIN_ID = process.env.BIN_ID;
const MASTER_KEY = process.env.MASTER_KEY;

function gerarNumeroSeguro() {
    return Math.floor(Math.random() * 200) + 1;
}

function obterHorarioOficial() {
    return Date.now();
}

async function lerResultado() {
    const response = await axios.get(
        `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`,
        {
            headers: {
                "X-Master-Key": MASTER_KEY
            }
        }
    );

    return response.data.record;
}

async function salvarResultado(numero) {
    await axios.put(
        `https://api.jsonbin.io/v3/b/${BIN_ID}`,

        { numero }
        ,
        {
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY
            }
        }
    );
}

app.get("/api/sorteio", async (req, res) => {
    try {

        const agora = obterHorarioOficial();

        if (agora >= DATA_SORTEIO) {

            let resultado = await lerResultado();

            if (!resultado || !resultado.numero) {
                const numero = gerarNumeroSeguro();
                await salvarResultado(numero);
                resultado = { numero };
            }

            return res.json({
                realizado: true,
                numero: resultado.numero
            });
        }

        res.json({
            realizado: false,
            dataSorteio: DATA_SORTEIO,
            agora
        });

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("Servidor rodando...");
});