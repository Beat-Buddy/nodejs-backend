const express = require("express");
const bodyParser = require("body-parser");
const spotify = require("../api/spotify-consumer");

const app = express();

app.use(bodyParser.json());

// Favorites list
let favorites = [];

// Add a song to favorites
app.put("/favorites/:songId", (req, res) => {
  const songId = req.params.songId;

  if (favorites.includes(songId)) {
    return res.status(400).json({ error: "Song already in favorites" });
  }

  favorites.push(songId);

  res.status(200).json({ message: "Song added to favorites" });
});

// Remove a song from favorites
app.delete("/favorites/:songId", (req, res) => {
  const songId = req.params.songId;

  const index = favorites.indexOf(songId);
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
