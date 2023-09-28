const passport = require("passport");

function AuthStrategy(req, res, next) {
  const auth = passport.authenticate("user-jwt", function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send("internal server error");
    }
    console.log("middleware:", err, user);

    if (!user) return res.status(401).send("unauthenticated user");

    req.logIn(user, { session: false }, function (err) {
      if (err) return next(err);
      req.user = user;
      next();
    });
  });
  auth(req, res, next);
}

module.exports = AuthStrategy;
