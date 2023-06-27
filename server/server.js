const express = require("express");
const bodyParser = require("body-parser");

const passport = require("passport");
const LocalStrategy = require("passport-local");
var session = require("express-session");

const app = express();

const users = require("./users").users;

app.use(bodyParser.json());

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    let user = null;
    users.forEach((loopUser) => {
      if (loopUser.username === username) user = loopUser;
    });

    if (user === null || user.password !== password) {
      console.log("Incorrect username or password.");
      return cb(null, false, { message: "Incorrect username or password." });
    }

    console.log("Login succeeded!");
    return cb(null, user);
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  return cb(
    null,
    users.find((user) => user.id === id)
  );
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "https://http.cat/401",
  })
);

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// GET-Endpoint to retrieve search-parameters from FE
app.get("/search", (req, res) => {
  const { searchParameter1, searchParameter2, searchParameter3 } = req.query;

  // Code to process the search parameters

  res.status(200).json({ message: "Search completed" });
});

// Favorites list
let favorites = [];

// Add a song to favorites
app.put("/favorites", (req, res) => {
  const song = req.body;

  if (favorites.some(favorite => favorite.id === song.id)) {
    return res.status(400).json({ error: "Song already in favorites" });
  }

  favorites.push(song);

  res.status(200).json({ message: "Song added to favorites" });
});

// Remove a song from favorites
app.delete("/favorites/:songId", (req, res) => {
  const songId = req.params.songId;

  const index = favorites.findIndex(song => song.id === songId);
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
app.get("/", checkNotAuthenticated, function (req, res) {
  res.send('This is the Node.js backend server of the "Beat Buddy" App.');
});
app.get("/profile", checkAuthenticated, function (req, res) {
  res.send("Hello and welcome to your profile, " + req.user.username + "!");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  next();
}
 
app.listen(3000, () => {
  console.log("The server is now listening on http://localhost:3000/");
});
