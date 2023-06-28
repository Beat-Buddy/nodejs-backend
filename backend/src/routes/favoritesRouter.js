const express = require("express");

const authCheck = require("../util/authCheck");
const musixmatch = require("../api/musixmatchConsumer");

const favoritesRouter = express.Router();

// Favorites list
let favorites = [];

// Add a song to favorites
favoritesRouter.post("/", authCheck.checkAuthenticated, async (req, res) => {
  const song = req.body;

  if (favorites.some((favorite) => favorite.id === song.id)) {
    return res.status(400).json({ error: "Song already in favorites" });
  }

  if (song.lyrics === undefined) {
    let lyrics = await musixmatch.getLyricsOfRequestedTrack(
      song.artist,
      song.title
    );
    song["lyrics"] = lyrics;
  }

  favorites.push(song);
  favorites.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });

  res.status(200).json({ message: "Song added to favorites" });
});

// Remove a song from favorites
favoritesRouter.delete("/:songId", authCheck.checkAuthenticated, (req, res) => {
  const songId = req.params.songId;

  const index = favorites.findIndex((song) => song.id === songId);
  if (index === -1) {
    return res.status(400).json({ error: "Song not found in favorites" });
  }

  favorites.splice(index, 1);

  res.status(200).json({ message: "Song removed from favorites" });
});

// Get the favorites list
favoritesRouter.get("/", authCheck.checkAuthenticated, (req, res) => {
  res.status(200).json({ favorites });
});

favoritesRouter.put("/", authCheck.checkAuthenticated, (req, res) => {
  let data = req.body;
  let songToUpdate = favorites.find((song) => song.id === data.id);

  if (!songToUpdate) res.sendStatus(404);
  else {
    songToUpdate.lyrics = data.lyrics;
    res.sendStatus(200);
  }
});

module.exports = {
  favoritesRouter,
};
