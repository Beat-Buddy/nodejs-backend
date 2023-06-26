const express = require("express");
const bodyParser = require("body-parser");
const spotify = require("../api/spotify-consumer");

const app = express();

app.use(bodyParser.json());

// GET-Endpoint to retrieve search-parameters from FE
app.get("/search", (req, res) => {
  const { searchParameter1, searchParameter2, searchParameter3 } = req.query;

  // Code to process the search parameters

  res.status(200).json({ message: "Search completed" });
});

// Favorites list
let favorites = [];

// Add a song to favorites
app.put("/favorites", (req, res) => {
  const song = req.body;

  if (favorites.some(favorite => favorite.id === song.id)) {
    return res.status(400).json({ error: "Song already in favorites" });
  }

  favorites.push(song);

  res.status(200).json({ message: "Song added to favorites" });
});

// Remove a song from favorites
app.delete("/favorites/:songId", (req, res) => {
  const songId = req.params.songId;

  const index = favorites.findIndex(song => song.id === songId);
  if (index === -1) {
    return res.status(400).json({ error: "Song not found in favorites" });
  }

  favorites.splice(index, 1);

  res.status(200).json({ message: "Song removed from favorites" });
});

// Get the favorites list
app.get("/favorites", (req, res) => {
  res.status(200).json({ favorites });
});

// Root route
app.get("/", function (req, res) {
  res.send('This is the Node.js backend server of the "Beat Buddy" App.');
});

app.listen(3000, () => {
  console.log("The server is now listening on http://localhost:3000/");
});
