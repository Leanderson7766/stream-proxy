import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Verificação simples
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "StreamTape Proxy ativo e funcional 🚀" });
});

// Endpoint para upload remoto no Streamtape
app.get("/upload", async (req, res) => {
  try {
    const { login, key, url, name = "", folder = "", headers = "" } = req.query;

    if (!login || !key || !url) {
      return res.status(400).json({
        error: "Parâmetros obrigatórios: login, key e url."
      });
    }

    // Monta a URL para a API do Streamtape
    const apiUrl = `https://api.streamtape.com/remotedl/add?login=${encodeURIComponent(login)}&key=${encodeURIComponent(key)}&url=${encodeURIComponent(url)}&folder=${encodeURIComponent(folder)}&headers=${encodeURIComponent(headers)}&name=${encodeURIComponent(name)}`;

    // Faz a requisição
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json, text/plain, */*"
      }
    });

    const result = await response.text();
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Porta padrão do Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
