const express = require("express");
const db = require("../db");
const router = express.Router();
const utils = require("../utils");
// const crypto = require("crypto-js");
// const jwt = require("jsonwebtoken");
router.get("/vendor", (request, response) => {
  const query = "select * from users";
  db.pool.execute(query, [], (error, result) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    }
    response.send(utils.createSuccessResult(result));
  });
});
module.exports = router;
