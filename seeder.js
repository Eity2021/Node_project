const path = require("path");

function init() {
  const config = require("./src/config");
  config.initEnvironmentVariables();

  const sequelize = require("./src/config/lib/sequelize");
  sequelize
    .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
    .then(() => {
      require("./src/modules/users/user.modal");
      sequelize
        .sync()
        .then(() => {
          console.log("DB seed complete");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

init();