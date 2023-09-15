const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  // let { email, token } = req.body;
  // let { email: emailFromParam } = req.params;
  let token = null;
  console.log(token)

  if (req && req.signedCookies) {
    // console.log(req.headers);
    token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).send("Authentication Failed");
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).send("Invalid Token");
    }
    req.user = decoded;
    // console.log("...........decode............" , decoded)
    next();
  });

  // email = email || emailFromParam;
  // const user = findUser(email);

  // if (!user) return res.status(404).send("Not found");
  // if (user.token !== token) return res.status(401).send("UnAuthenticate");
  // next();
}

module.exports = authenticate;
