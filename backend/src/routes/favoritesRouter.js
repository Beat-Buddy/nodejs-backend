const express = require("express");

const favoritesRouter = express.Router();

// Favorites list
let favorites = [];

// Add a song to favorites
favoritesRouter.post("/", (req, res) => {
  const song = req.body;

  if (favorites.some(favorite => favorite.id === song.id)) {
    return res.status(400).json({ error: "Song already in favorites" });
  }

  favorites.push(song);

  res.status(200).json({ message: "Song added to favorites" });
});

// Remove a song from favorites
favoritesRouter.delete("/:songId", (req, res) => {
  const songId = req.params.songId;

  const index = favorites.findIndex(song => song.id === songId);
  if (index === -1) {
    return res.status(400).json({ error: "Song not found in favorites" });
  }

  favorites.splice(index, 1);

  res.status(200).json({ message: "Song removed from favorites" });
});

// Get the favorites list
favoritesRouter.get("/", (req, res) => {
  res.status(200).json({ favorites });
});

module.exports={
    favoritesRouter
}