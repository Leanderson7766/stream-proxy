import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Rota inicial para teste no navegador
app.get("/", (req, res) => {
  res.status(200).send("✅ StreamTape Proxy ativo e rodando!");
});

// ✅ Rota para upload remoto
app.get("/upload", async (req, res) => {
  try {
    const { login, key, url, folder, name } = req.query;

    if (!login || !key || !url) {
      return res.status(400).json({ error: "Parâmetros obrigatórios ausentes!" });
    }

    const apiUrl = `https://api.streamtape.com/remotedl/add?login=${login}&key=${key}&url=${encodeURIComponent(url)}&folder=${folder || ""}&name=${encodeURIComponent(name || "arquivo")}`;

    const response = await fetch(apiUrl);
    const data = await response.text();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Configuração da porta Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Proxy rodando na porta ${PORT}`));
