const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto"); // randomBytes is a function that generates a random string of bytes
const cors = require("cors"); // cors is a middleware that allows cross-origin requests
const axios = require("axios"); // Eksik import

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  res.status(201).send(posts[id]);
});

// Event handler endpoint'i ekle
app.post("/events", (req, res) => {
  console.log("Event Received:", req.body.type);
  
  res.send({}); // Boş bir yanıt döndür
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
