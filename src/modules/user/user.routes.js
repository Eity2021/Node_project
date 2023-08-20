const {createUser,getUsers,updateUser,getUser,deleteUser} = require("./user.controller.js");

module.exports = (app) => {
  app.route("/users").post(createUser).get(getUsers);

  app.route("/users/:email").patch(updateUser).get(getUser).delete(deleteUser);

};
