const express = require("express");

const musixmatch = require("../api/musixmatchConsumer");
const spotify = require("../api/spotifyConsumer");
const authCheck = require("../util/authCheck");

const recommendationsRouter = express.Router();

// GET-Endpoint to retrieve search-parameters from FE
recommendationsRouter.get("/", authCheck.checkAuthenticated, (req, res) => {
  const { searchParameter1, searchParameter2, searchParameter3 } = req.query;

  // Code to process the search parameters

  res.status(200).json({ message: "Search completed" });
});

module.exports = {
  recommendationsRouter,
};
