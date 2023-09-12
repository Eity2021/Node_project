const userRoutes = require("../../modules/users/user.routes"); // Check this import path
const express = require("express");
const cookieParser = require("cookie-parser");
const userStrategy = require("../../modules/users/user.strategy")

module.exports = function () {
  const app = express();
  app.use(express.json());
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // Make sure userRoutes is a function or router object
  userRoutes(app);
  userStrategy()
  app.set('port', process.env.PORT);

  return app;
}
