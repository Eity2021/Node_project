const validate = require("../core/middleWares/validate.js");
const {createUser,getUsers,updateUser,getUser,deleteUser , login} = require("./user.controller.js");
const {createUserSchema , UserUpdateSchema} = require('./user.schema')
//const authenticate = require('../core/middleWares/authenticate.js');
const AuthStrategy = require('./user-authentication.middleware.js');
// function print(res,req,next){
//   next();
// }



module.exports = (app) => {
  app.route("/users")
  .post(validate(createUserSchema),createUser)
  .get(getUsers);

  app.route("/users/:email")
  .get(getUser)
  .patch(AuthStrategy ,validate(UserUpdateSchema),updateUser)
  .delete(deleteUser);

  app.post("/users/login" , login);


};
