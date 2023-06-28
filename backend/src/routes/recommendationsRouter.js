const express = require("express");

const musixmatch = require("../api/musixmatchConsumer");
const spotify = require("../api/spotifyConsumer");
const authCheck = require("../util/authCheck");

const recommendationsRouter = express.Router();

// POST-Endpoint to retrieve search-parameters from FE
recommendationsRouter.post("/", authCheck.checkAuthenticated, async (req, res) => {
  let values = req.body;
  console.log("Recommendations:");
  console.log(values);
  
  let recommendations = await spotify.getRecommendations(values);
  res.status(200).json(recommendations);
});

module.exports = {
  recommendationsRouter,
};
