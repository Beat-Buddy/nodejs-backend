const express = require("express");
const path = require("path");
const authCheck = require("../util/authCheck");

const homeRouter = express.Router();
const feUrl = "../frontend/src";

homeRouter.get("/", authCheck.checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(process.cwd(), feUrl, "login.html"));
});

homeRouter.get("/login", authCheck.checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(process.cwd(), feUrl, "login.html"));
});

homeRouter.get("/search", authCheck.checkAuthenticated, (req, res) => {
  res.sendFile(path.join(process.cwd(), feUrl, "search.html"));
});

homeRouter.get("/favorites", authCheck.checkAuthenticated, (req, res) => {
  res.sendFile(path.join(process.cwd(), feUrl, "favorite.html"));
});

homeRouter.get("/logout", (req, res) => {
  res.sendFile(path.join(process.cwd(), feUrl, "logout.html"));
});

module.exports = { homeRouter };
