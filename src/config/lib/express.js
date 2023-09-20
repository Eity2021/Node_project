const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("../index");

module.exports = function () {
  const app = express();
  app.use(express.json());
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.set("port", process.env.PORT);
  // Make sure userRoutes is a function or router object
  // const userRoutes = require("../../modules/users/user.routes"); // Check this import path
  // userRoutes(app);

  const globalConfig = config.getGlobalConfig();

  globalConfig.routes.forEach(function (routePath) {
    // console.log("...............", routePath);
     require(path.resolve(routePath))(app);

    // const fullRoutePath = path.resolve(routePath);
    // const routes = require(fullRoutePath); // Check this import path
    // routes(app);
  });

  globalConfig.strategies.forEach(function (strategyPath) {
    // console.log("...............", routePath);
        require(path.resolve(strategyPath))();

    // const fullStrategyPath = path.resolve(strategyPath);
    // const strategy = require(fullStrategyPath);
    // strategy()
  });



  return app;
};
