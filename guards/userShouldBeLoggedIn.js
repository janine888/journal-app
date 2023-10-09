var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
    //grab the token from the headers
    const token = req.headers["authorization"].replace(/^Bearer\s/, "");
  
    if (!token) {
      //if there is no token, throw an error
      res.status(401).send({ message: "please provide a token" });
    } else {
      //if there is a token, verify it
      jwt.verify(token, supersecret, function (err, decoded) {
        //uf there is a token, but it is not valid, throw an error
        if (err) res.status(401).send({ message: err.message });
        else {
          //everything is awesome, create a new property on the request
          //object and store the user id in it
          console.log(decoded);
          req.user_id = decoded.user_id;
          //call next() to continue with the execution of the next step in the route
          next();
        }
      });
    }
  }


module.exports = userShouldBeLoggedIn;