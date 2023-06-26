const express = require("express");
const spotify = require("../api/spotify-consumer");

const app = express();

app.listen(3000);

app.get("/", function (req, res) {
  res.send('This is the Node.js backend server of the "Beat Buddy" App.');
});

console.log("The server is now listening on http://localhost:3000/");
