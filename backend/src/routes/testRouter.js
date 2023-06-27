const express = require("express");

const authCheck = require("../util/authCheck");
const musixmatch = require("../api/musixmatchConsumer");
const spotify = require("../api/spotifyConsumer");

const testRouter = express.Router();

testRouter.get("/", authCheck.checkNotAuthenticated, function (req, res) {
  res.send('This is the Node.js backend server of the "Beat Buddy" App.');
});

testRouter.get("/execute", function (req, res) {
  spotify.getRecommendations({
    seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
    seed_genres: "classical",
    limit: 2,
  });
  musixmatch.getLyricsOfRequestedTrack(
    "Rick Astley",
    "Never Gonna Give You Up"
  );
  res.sendStatus(200);
});

testRouter.get("/profile", authCheck.checkAuthenticated, function (req, res) {
  res.send("Hello and welcome to your profile, " + req.user.username + "!");
});

module.exports = {
  testRouter,
};
