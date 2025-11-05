import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Stream Proxy ativo!" });
});

app.get("/upload", async (req, res) => {
  try {
    const { login, key, url, folder, name } = req.query;

    if (!login || !key || !url) {
      return res.status(400).json({ error: "Parâmetros obrigatórios ausentes" });
    }

    const apiUrl = `https://api.streamtape.com/remotedl/add?login=${login}&key=${key}&url=${encodeURIComponent(url)}&folder=${folder || ""}&name=${encodeURIComponent(name || "arquivo")}`;

    const response = await fetch(apiUrl);
    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
