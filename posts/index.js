const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto"); // randomBytes is a function that generates a random string of bytes
const cors = require("cors"); // cors is a middleware that allows cross-origin requests

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Vite'ın varsayılan portu
    methods: ['GET', 'POST']
}));
app.use(express.json()); // Bu satırın cors'dan sonra olduğundan emin olun

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
