const userRoutes = require("../../modules/user/user.routes"); // Check this import path
const express = require("express");

module.exports = function () {
  const app = express();
  app.use(express.json());

  // Make sure userRoutes is a function or router object
  userRoutes(app);

  app.set('port', process.env.PORT);

  return app;
}
