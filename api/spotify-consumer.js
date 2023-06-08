const axios = require("axios");
const fs = require("fs");
const ACCESS_TOKEN = require("./access-token");

const SPOTIFY_API_URL = "https://api.spotify.com/v1";

//Client ID and client secret, private keys we got from Spotify after creating an app on the spotify developer dashboard, used for requesting access tokens
const CLIENT_ID = "a77c30d64c6e4f448693b864b9fa0ce8";
const CLIENT_SECRET = "7fe3fb3fb288461e8dd8949659f42971";

//Access tokens are requested here, they are used for making the actual data calls to the Spotify API, f.e. requesting a song by an ID, they expire after an hour
function updateAccessToken() {
  //Check if access token isn't expired yet
  if (Date.now() >= ACCESS_TOKEN.expires) {
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", CLIENT_ID);
    data.append("client_secret", CLIENT_SECRET);

    axios
      .post("https://accounts.spotify.com/api/token", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data);
        let newAccessToken = {
          access_token: res.data.access_token,
          expires: Date.now() + res.data.expires_in * 1000 - 60000, //manually reducing expire time by one minute to create a buffer if last request before renewing takes a long time
        };
        fs.writeFile(
          "api/access-token.js",
          "module.exports=" + JSON.stringify(newAccessToken),
          (err) => {
            if (err) throw err;
            console.log("Access token saved");
          }
        );
      })
      .catch((error) => {
        console.log(error.response);
      });
  } else {
    console.log(
      "Current access token is not expired yet and is still usable."
    );
  }
}

module.exports = {
  updateAccessToken,
};
