const express = require("express");

const authCheck = require("../util/authCheck");
const musixmatch = require("../api/musixmatchConsumer");

const favoritesRouter = express.Router();

// Favorites list
let favorites = [];

// Add a song to favorites
favoritesRouter.post("/", authCheck.checkAuthenticated, async (req, res) => {
  const song = req.body;
  const username = req.user.username;

  if (
    favorites.some(
      (favorite) => favorite.id === song.id && favorite.user === username
    )
  ) {
    return res.status(400).json({ error: "Song already in favorites" });
  }

  if (song.user === undefined) {
    song["user"] = username;
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
  const username = req.user.username;

  const index = favorites.findIndex(
    (song) => song.id === songId && song.user === username
  );
  if (index === -1) {
    return res.status(400).json({ error: "Song not found in favorites" });
  }

  favorites.splice(index, 1);

  res.status(200).json({ message: "Song removed from favorites" });
});

// Get the favorites list
favoritesRouter.get("/", authCheck.checkAuthenticated, (req, res) => {
  const username = req.user.username;
  console.log(username);

  console.log(favorites);
  let userFilteredFavorites = favorites.filter(song=> song.user === username);
  console.log(userFilteredFavorites);

  res.status(200).json({ userFilteredFavorites });
});

favoritesRouter.put("/", authCheck.checkAuthenticated, (req, res) => {
  const data = req.body;
  const username = req.user.username;

  let songToUpdate = favorites.find(
    (song) => song.id === data.id && song.user === username
  );

  if (!songToUpdate) res.sendStatus(404);
  else {
    songToUpdate.lyrics = data.lyrics;
    res.sendStatus(200);
  }
});

module.exports = {
  favoritesRouter,
};
