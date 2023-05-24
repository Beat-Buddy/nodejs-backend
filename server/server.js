const express = require("express");

const app = express();

app.listen(3000);

app.get("/", function (req, res) {
  res.send({
    Message: 'This is the Node.js backend server of the "Beat Buddy" App.',
  });
});

console.log("The server is now listening on http://localhost:3000/");
