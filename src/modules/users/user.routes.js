const validate = require("../core/middleWares/validate.js");
const {createUser,getUsers,updateUser,getUser,deleteUser} = require("./user.controller.js");
const {createUserSchema} = require('./user.schema')
// function print(res,req,next){
//   next();
// }



module.exports = (app) => {
  app.route("/users")
  .post(validate(createUserSchema),createUser)
  .get(getUsers);

  app.route("/users/:email").patch(updateUser).get(getUser).delete(deleteUser);

};
