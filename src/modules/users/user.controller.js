const validate = require("../core/middleWares/validate");
const { createUserSchema } = require("./user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./user.modal");




const users = [];

async function createUser(req, res) {
     
try{
  const { firstName, lastName, email, password } = req.body;

  //const hashedPassword = bcrypt.hashSync(password, 8);

  //const email = body.email;
  //const name = body.name;

  const existUser = await User.findOne({
    where:{email},
  });
  
  // .then(async (existUser) => {
    if(existUser) return res.status(400).send("Already registered");
    
   const user = await  User.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).send(user);
}catch(err){
  console.log(err);
  res.status(500).send("internal server error")
}
    // .then((user) => {
    //   res.status(201).send(user);
    // })
    // .catch((err) => {
    //   console.log(err);
    //   res.status(500).send("internal server error")
    // });
  
  // }).catch((err) => {
  //   console.log(err);
  //   res.status(500).send("internal server error")
  // })
  // const user = users.find((user) => user.email === email);
  // formula 3

  //if (user) return res.send("user already exists");

  // const newUser = {
  //   firstName,
  //   lastName,
  //   email,
  //   password: hashedPassword,
  // };


  //users.push(newUser);




  // const modifierUser = { ...newUser };
  // delete modifierUser.password;

 

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
  //  }}

  
  
}

async function login(req, res) {

  try{
    const { email, password } = req.body;
    const user = await User.findOne({
      where:{email},
     // attributes:{exclude : ["password"],}
    });
    
    // .then(async (existUser) => {
      if(!user || !user.password || !user.validPassword(password)) return res.status(400).send("invalid Credentials");
      
      const token = jwt.sign(

        { 
          id:user.id, 
          email: user.email,
           firstName: user.firstName, 
           lastName: user.lastName },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h", issuer: user.email }
      );   

    
      res.cookie("access_token", token, {
        httpOnly: true,
    
      });
    
      res.status(200).send(user);

      //res.status(201).send(user);
  }catch(err){
    console.log(err);
    res.status(500).send("internal server error")
  }


 
}

async function getUsers(req, res) {
  try{
  
     const users = await  User.findAll({
      attributes:{exclude:["password"]}
     });
      res.status(201).send(users);
  }catch(err){
    console.log(err);
    res.status(500).send("internal server error")
  }
}

async function getUser(req, res) {

  try{
    const userId = req.params.id;
    const user = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ["password"]},
    });
    //res.status(201).send(user);

    if (!user) {
      // User not found, return a 404 status code and a meaningful message.
      res.status(404).send("User not found");
    } else {
      // User found, return a 200 status code and the user data.
      res.status(201).send(user);
    }
  }catch(err){
    console.log(err);
    res.status(500).send("Internal Server Error")
  }

  //if (!user) return res.status(404).send("User not found");

  // res.send(user);
}

async function updateUser(req, res) {
  // const email = req.params.email;
  // const name = req.body.name;

  // const user = users.find((user) => user.email === email);

  // if (!user) return res.send("user not found");

  // user.name = name;
  // res.send(user);
  // const { firstName, lastName } = req.body;

  // const user = users.find((user) => user.email === req.params.email);

  // if (!user) return res.status(404).send("user not found");

  // user.firstName = firstName;
  // user.lastName = lastName;

  // res.send(user);
  try {
    const { firstName, lastName } = req.body;
    const email = req.user.email;

    const user = await User.findOne({
        where: { email },
    });

    if (!user) return res.status(404).send("User not found");

    await User.update(
        {
            firstName,
            lastName,
        },
        { where: { email } }
    );

    const updatedUser = await User.findOne({
        where: { email },
        //attributes: { exclude: ["password"] },
    });

    res.status(200).send(updatedUser);
} catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
}
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
