const axios = require("axios");
const fs = require("fs");
let access_token = require("../data/accessToken");

const SPOTIFY_API_URL = "https://api.spotify.com/v1";

//Client ID and client secret, private keys we got from Spotify after creating an app on the spotify developer dashboard, used for requesting access tokens
const CLIENT_ID = "a77c30d64c6e4f448693b864b9fa0ce8";
const CLIENT_SECRET = "7fe3fb3fb288461e8dd8949659f42971";

//Access tokens are requested here, they are used for making the actual data calls to the Spotify API, f.e. requesting a song by an ID, they expire after an hour
function updateAccessToken() {
  //Check if access token isn't expired yet
  if (Date.now() >= access_token.expires || access_token.expires == undefined) {
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", CLIENT_ID);
    data.append("client_secret", CLIENT_SECRET);

    return new Promise((resolve) => {
      axios
        .post("https://accounts.spotify.com/api/token", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((axiosResponse) => {
          console.log(axiosResponse.data);
          let newAccessToken = {
            access_token: axiosResponse.data.access_token,
            expires: Date.now() + axiosResponse.data.expires_in * 1000 - 60000, //manually reducing expire time by one minute to create a buffer if last request before renewing takes a long time
          };
          fs.writeFile(
            "src/data/accessToken.js",
            "module.exports=" + JSON.stringify(newAccessToken),
            (writeFileError) => {
              if (writeFileError) {
                console.log("Spotify: Error saving access token!");
                throw writeFileError;
              } else {
                access_token = newAccessToken; //Save access token also in runtime variable so it can be used without restarting
                console.log("Spotify: Access token saved");
                resolve();
              }
            }
          );
        })
        .catch((axiosError) => {
          console.log("Spotify: Error updating access token!");
          throw axiosError;
        });
    });
  } else {
    console.log("Spotify: Current access token is not expired yet and is still usable.");
  }
}

//You have to pass a JSON object with the params, the keys need to have the exact same name as the required params of the Spotify API endpoint
//The function returns a JSON object with the results
async function getRecommendations(jsonData) {
  await updateAccessToken();

  let urlString = SPOTIFY_API_URL + "/recommendations?";
  Object.entries(jsonData).forEach(([key, value]) => {
    if (value != null) {
      if (!urlString.endsWith("?")) urlString += "&";
      urlString += key + "=" + value;
    }
  });
  urlString = urlString.replace(/ /g, "+");
  console.log(urlString);
  
  return new Promise((resolve)=>{
  axios
    .get(urlString, {
      headers: {
        Authorization: "Bearer " + access_token.access_token,
      },
    })
    .then((axiosResponse) => {
      resolve(axiosResponse.data);
    })
    .catch((axiosError) => {
      console.log("Spotify: Error with getting recommendations!");
      throw axiosError;
    });
  });
}

module.exports = {
  getRecommendations,
};
