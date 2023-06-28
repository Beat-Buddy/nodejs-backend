const passport = require("passport");
const LocalStrategy = require("passport-local");

const users = require("../data/users").users;

passport.use(
    new LocalStrategy(function verify(username, password, cb) {
      let user = null;
      users.forEach((loopUser) => {
        if (loopUser.username === username) user = loopUser;
      });
  
      if (user === null || user.password !== password) {
        console.log("Passport: Incorrect username or password.");
        return cb(null, false, { message: "Incorrect username or password." });
      }
  
      console.log("Passport: Login succeeded!");
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

module.exports={
    passport
}