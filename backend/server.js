const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const utils = require("./utils");
const app = express();
app.use(cors());
app.use(express.json());
app.use((request, response, next) => {
  // check if token is required for the API
  // console.log(request);
  if (
    // request.url === "/user/" ||
    request.url === "/user/login" ||
    request.url === "/user/register" ||
    request.url.startsWith("/image/")
  ) {
    // skip verifying the token
    next();
  } else {
    // get the token
    const token = request.headers["token"];

    if (!token || token.length === 0) {
      response.send(utils.createErrorResult("missing token"));
    } else {
      try {
        // verify the token
        const payload = jwt.verify(token, "12345");

        // add the user Id to the request
        request.userId = payload["id"];
        // console.log(request);
        //TODO: expiry logic

        // call the real route
        next();
      } catch (ex) {
        response.send(utils.createErrorResult("invalid token"));
      }
    }
  }
});
const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.listen(4000, "0.0.0.0", () => {
  console.log(`server is running on port 4000`);
});
