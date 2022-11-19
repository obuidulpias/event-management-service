require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/events/events.router");

app.use(express.json());

app.use("/apis", userRouter);
// const port = 4000;
// app.listen(port, () => {
//   console.log("server up and running on PORT :", port);
// });
app.listen(8000, () => {
  console.log("Server On");
});