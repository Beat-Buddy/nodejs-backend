const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const passport = require("../config/passport").passport;

const authRouter = require("../routes/authRouter").authRouter;
const favoritesRouter = require("../routes/favoritesRouter").favoritesRouter;
const recommendationsRouter = require("../routes/recommendationsRouter").recommendationsRouter;
const testRouter = require("../routes/testRouter").testRouter;

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), "../frontend/src")));
app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/favorites", favoritesRouter);
app.use("/recommendations", recommendationsRouter);
app.use("/", testRouter);
 
app.listen(3000, () => {
  console.log("The server is now listening on http://localhost:3000/");
});
