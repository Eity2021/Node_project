module.exports.start = function () {
  const app = require('./express.js')();


  app.listen(app.get("port"), function () {
    console.log("Running on the port 3000!");
  });
};
