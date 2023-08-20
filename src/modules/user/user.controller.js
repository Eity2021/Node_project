const { string, object } = require("yup");

const users = [];

function createUser(req, res) {
  const body = req.body;

  const email = body.email;
  const name = body.name;

  const registrationSchema = object().shape({
    email: string()
      .email("This filed should be a valid email address")
      .required("This field must not be empty"),
    name: string()
      .min(2, "This field must be at least 2 characters long")
      .max(30, "This field must be at most 30 characters long")
      .required("This field must not be empty"),
  });
  const promise = registrationSchema.validate(
    { email, name },
    { abortEarly: false }
  );

  promise
    .then(function () {
      const user = users.find((user) => user.email === email);

      console.log(user);

      // formula 3

      if (user) return res.send("user already exists");

      users.push(body);
      res.status(201).send(body);
    })
    .catch(function (err) {
      const errorMsg = { path: err.inner[0].path, msg: err.inner[0].message };
      return res.status(400).send(errorMsg);
    });

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

function getUsers(req, res) {
  res.send(users);
}

function updateUser(req, res) {
  const email = req.params.email;
  const name = req.body.name;

  const user = users.find((user) => user.email === email);

  if (!user) return res.send("user not found");

  user.name = name;
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

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
