const express = require("express");
const db = require("../db");
const router = express.Router();
const utils = require("../utils");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

// router.get("/", (request, response) => {
//   response.send("userCalled");
// });
router.post("/register", (request, response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    address,
    role,
    roleID,
  } = request.body;
  const encryptedPass = String(crypto.SHA256(password));
  const query = `insert into users(
    firstName ,
    lastName ,
    email ,
    password ,
    phoneNumber ,
    address,
    role ,
    roleID)
    values (?,?,?,?,?,?,?,?)`;

  db.pool.execute(
    query,
    [
      firstName,
      lastName,
      email,
      encryptedPass,
      phoneNumber,
      address,
      role,
      roleID,
    ],
    (error, result) => {
      if (error) {
        response.send(utils.createErrorResult(error));
      }
      response.send(utils.createSuccessResult(result));
    }
  );
});

router.get("/", (request, response) => {
  const query = "select * from users";
  db.pool.execute(query, [], (error, result) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    }
    response.send(utils.createSuccessResult(result));
  });
});

router.post("/login", (request, response) => {
  const { email, password } = request.body;
  const encryptedPass = String(crypto.SHA256(password));
  const q =
    "select id, firstName, lastName , email , password ,phoneNumber ,address, role,  roleID, isDeleted from users where email=? and password=?";
  db.pool.query(q, [email, encryptedPass], (error, users) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else {
      if (users.length == 0) {
        response.send(utils.createErrorResult("user does not exist"));
      } else {
        const user = users[0];
        if (user.isDeleted) {
          response.send(utils.createErrorResult("your account is closed"));
        } else {
          const payload = { id: user.id };
          const token = jwt.sign(payload, "12345");
          const userData = {
            token,
            name: `${user["firstName"]} ${user["lastName"]}`,
          };
          response.send(utils.createSuccessResult(userData));
        }
      }
    }
  });
});

module.exports = router;
