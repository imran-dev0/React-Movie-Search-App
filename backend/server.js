import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Loads .env file

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

app.use(cors());

// Popular movies
app.get("/api/popular", async (req, res) => {
  try {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error("TMDB API Error:", response.statusText);
      return res.status(500).json({ error: "TMDB API failed" });
    }

    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error("Server error /api/popular:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Search movies
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.query;
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error("TMDB Search API Error:", response.statusText);
      return res.status(500).json({ error: "TMDB Search failed" });
    }

    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error("Server error /api/search:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("🎬 Welcome to the Movie API backend. Use /api/popular or /api/search.");
});


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
