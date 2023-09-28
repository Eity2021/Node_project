const path = require("path");
const async = require("async");
async function init() {
  const config = require("./src/config");
  config.initEnvironmentVariables();

  const sequelize = require("./src/config/lib/sequelize");


  // sequelize
  //   .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
  //   .then(() => {
  //     require("./src/modules/users/user.modal");
  //     sequelize
  //       .sync()
  //       .then(() => {
  //         console.log("DB seed complete");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  await sequelize.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`

  );
  const User = require("./src/modules/users/user.modal");

  await sequelize.sync();

 function userSeeder(callback){
 User.findOrCreate({
  where:{email:"eityakter@gmail.com"},
  defaults:{
    firstName:"Eity",
    lastName:"Akter",
    password:"12345678"
  }
 }).then(() => {
  callback();
 });
 }

 function serviceSeeder(callback){
  callback();
 }
  async.waterfall([userSeeder,serviceSeeder], (err) => {
    if(err) console.error(err);
    else console.log("DB seed complete");
    process.exit();
  })

};

init();