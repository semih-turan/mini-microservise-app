const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send([]);
});

app.post("/events", (req, res) => {
  console.log("Event Received:", req.body.type);
  res.send({});
});

app.listen(4002, () => {
  console.log("Server is running on port 4002");
});
