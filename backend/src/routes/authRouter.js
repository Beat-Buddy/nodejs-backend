const express = require("express");
const passport = require("../config/passport").passport;
const authCheck = require("../util/authCheck");
const path = require("path");

const authRouter = express.Router();

authRouter.post(
  "/login",
  authCheck.checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/search",
    failureRedirect: "/login",
  })
);

authRouter.post(
  "/logout",
  authCheck.checkAuthenticated,
  function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.sendFile(path.join(process.cwd(), "../frontend/src", "logout.html"));
    });
  }
);

module.exports = {
  authRouter,
};
