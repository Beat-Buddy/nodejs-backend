const axios = require("axios");
const API_KEY = "4f917469f74259d3a87c579b0440c459";
const API_URL = "https://api.musixmatch.com/ws/1.1";

function getTrackIdOfRequest(artist, title) {
  console.log("Searching for '" + title + "' by " + artist + "...");

  let urlString =
    API_URL +
    "/track.search?apikey=" +
    API_KEY +
    "&q_track=" +
    title +
    "&q_artist=" +
    artist +
    "&page_size=1&page=1&s_track_rating=desc";
  urlString = urlString.replace(/ /g, "+");
  console.log(urlString);

  return new Promise((resolve) =>
    axios
      .get(urlString)
      .then((response) => {
        console.log("Track response received!");
        console.log(response.data.message.body.track_list[0]);
        resolve(response.data.message.body.track_list[0].track.track_id);
      })
      .catch((axiosError) => {
        console.log("Error with getting song lyrics!");
        throw axiosError;
      })
  );
}

function getLyricsOfTrack(track_Id) {
  let lyricsUrlString =
    API_URL + "/track.lyrics.get?apikey=" + API_KEY + "&track_id=" + track_Id;
  console.log(lyricsUrlString);
  return new Promise((resolve) =>
    axios
      .get(lyricsUrlString)
      .then((response) => {
        console.log("Lyrics response received!");
        resolve(response.data.message.body.lyrics.lyrics_body);
      })
      .catch((axiosError) => {
        console.log("Error with getting song lyrics!");
        throw axiosError;
      })
  );
}

async function getLyricsOfRequestedTrack(artist, title) {
  let track_Id = await getTrackIdOfRequest(artist, title);
  console.log("Track ID: " + track_Id);

  let lyrics = await getLyricsOfTrack(track_Id);
  let endIndex = lyrics.search("\n" + "...\n" + "\n");
  lyrics = lyrics.substring(0, endIndex - 1) + "...";
  console.log(lyrics);
  return lyrics;
}

module.exports = {
  getLyricsOfRequestedTrack,
};
