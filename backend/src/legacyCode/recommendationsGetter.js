const axios = require("axios");
let access_token = require("../data/accessToken");

class RecommendationsGetter {
  #urlString = "https://api.spotify.com/v1/recommendations?";

  setLimit(limit) {
    this.#addProperty("limit", limit);
    return this;
  }
  setArtists(artists) {
    this.#addProperty("seed_artists", artists);
    return this;
  }
  setGenres(genres) {
    this.#addProperty("seed_genres", genres);
    return this;
  }
  setTracks(tracks) {
    this.#addProperty("seed_tracks", tracks);
    return this;
  }
  setPopularity(popularity) {
    this.#addProperty("target_popularity", popularity);
    return this;
  }
  setDanceability(danceability) {
    this.#addProperty("target_danceability", danceability);
    return this;
  }
  setEnergy(energy) {
    this.#addProperty("target_energy", energy);
    return this;
  }
  setValence(valence) {
    this.#addProperty("target_valence", valence);
    return this;
  }
  setInstrumentalness(instrumentalness) {
    this.#addProperty("target_instrumentalness", instrumentalness);
    return this;
  }
  setTempo(tempo) {
    this.#addProperty("target_tempo", tempo);
    return this;
  }

  #addProperty(name, value) {
    if (!this.#urlString.endsWith("?")) this.#urlString += "&";
    this.#urlString += name + "=" + value;
  }

  getUrlString(){
    return this.#urlString;
  }

  getRecommendations() {
    axios
      .get(this.#urlString, {
        headers: {
          Authorization: "Bearer " + access_token.access_token,
        },
      })
      .then((res) => {
        return res;
      });
  }
}

module.exports={
    RecommendationsGetter
}