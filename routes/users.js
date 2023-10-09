var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
require("dotenv").config();
let userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
let bcrypt = require("bcrypt");
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//get ALL users
router.get("/all", async (req, res) => {
  try {
      let results = await db('SELECT * FROM users');
      let users = results.data; 
      res.send(users);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});


//get one user by username
router.get("/profile", userShouldBeLoggedIn, async (req, res) => {
  //const username = req.params.username;
  console.log(req.user_id);
  try {
    const results = await db(`SELECT * FROM users WHERE id = ${req.user_id};`)
    //console.log(results.data[0].username);
    res.status(200).send(results.data);
  
  } catch (err) {
  res.status(400).send({ message: err.message});
  }
});


//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const results = await db(
      `SELECT * FROM users WHERE username = "${username}";`
    );
    const user = results.data[0];
    if (user) {
      const user_id = user.id;
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) throw new Error("Incorrect password");
      let token = jwt.sign({ user_id }, supersecret);
      res.send({ message: `Login successful, welcome to the Journal App , ${username}! 😊`});
      console.log(token);
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(400).send({ message: error.message});
  }
});


//register
router.post('/register', async (req, res) => {
  const {
    username,
    email,
    password
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    await db(
      `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hash}');`
    );
    res.send({ message: "Registration successful"});
  } catch (err) {
    res.status(400).send({ message: err.message});
  }
});

module.exports = router;
