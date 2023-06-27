const express = require("express");
const passport = require("../config/passport").passport;

const authRouter = express.Router();

authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "https://http.cat/401",
  })
);

authRouter.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports={
    authRouter
}