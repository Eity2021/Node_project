const validate = require("../core/middleWares/validate");
const { createUserSchema } = require("./user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// validate

// validate

const users = [];

function createUser(req, res) {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  //const email = body.email;
  //const name = body.name;

  const user = users.find((user) => user.email === email);
  // formula 3

  if (user) return res.send("user already exists");

  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
  };
  users.push(newUser);
  const modifierUser = { ...newUser };
  delete modifierUser.password;

  res.status(201).send(modifierUser);

  // formula 2

  //  if( user === undefined) {
  //   users.push(body);
  //   res.send(body);
  //  }
  //  else(
  //   res.send("user already exists")
  //  )

  // formula 1
  //  function cb(user) {
  //    if(user.email === email) return true;
  //    else return false;
  //  }

  //  const user = users.find(cb);
  //  if(user === undefined) {
  //   users.push(body);
  //   res.send(body);
  //  }
  //  else {
  //   res.send("user already exit")
  //  }
}

function login(req, res) {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) return res.status(400).send("Invalid credential");

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) return res.status(400).send("Invalid credential");

  const token = jwt.sign(
    { email: user.email, firstName: user.firstName, lastName: user.lastName },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h", issuer: user.email }
  );   
   //console.log("login method :" , token)
  const modifierUser = { ...user };
  delete modifierUser.password;

  res.cookie("access_token", token, {
    httpOnly: true,

  });

  res.status(200).send(modifierUser);
}

function getUsers(req, res) {
  res.send(users);
}

function updateUser(req, res) {
  // const email = req.params.email;
  // const name = req.body.name;

  // const user = users.find((user) => user.email === email);

  // if (!user) return res.send("user not found");

  // user.name = name;
  // res.send(user);
  const { firstName, lastName } = req.body;

  const user = users.find((user) => user.email === req.params.email);

  if (!user) return res.status(404).send("user not found");

  user.firstName = firstName;
  user.lastName = lastName;

  res.send(user);
}

function getUser(req, res) {
  res.send(users);
}

function deleteUser(req, res) {
  const email = req.params.email;

  const user = users.find((user) => user.email === email);

  if (!user) return res.send("user not found");

  const index = users.findIndex((user) => user.email === email);
  users.splice(index, 1);

  res.send(user);
}

function findUser(email) {
  const user = users.find((user) => user.email === email);
  return user;
}
module.exports.login = login;
module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.findUser = findUser;
