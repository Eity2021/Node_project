const users = [];

function createUser(req, res) {
  const body = req.body;

  const email = body.email;
  const name = body.name;
  
  if(!email) return res.status(400).send('Email is required.');
  if(!name) return res.status(400).send('Name is required.');

  const user = users.find((user) => user.email === email);

  console.log(user);

  // formula 3

  if (user) return res.send("user already exists");

  users.push(body);
  res.status(201).send(body);

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

    const index = users.findIndex(user => user.email === email);
    users.splice(index, 1);

    res.send(user);




}

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
