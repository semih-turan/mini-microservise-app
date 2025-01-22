const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto"); // randomBytes is a function that generates a random string of bytes
const cors = require("cors"); // cors is a middleware that allows cross-origin requests

const app = express();
app.use(bodyParser.json()); // bodyParser is a middleware that parses the body of the request
app.use(cors()); // cors is a middleware that allows cross-origin requests

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
        id,
        title
    };
    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
