const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const posts = {};

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    if (post) {
      post.comments.push({ id, content, status });
    }
  }

  if (type === "CommentUpdated") {
    const { id, postId, status, content } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  try {
    handleEvent(type, data);
    res.send({});
  } catch (error) {
    console.error("Error processing event:", error);
    res.status(500).send({ status: "ERROR", message: error.message });
  }
});

app.listen(4002, async () => {
  console.log("Server is running on port 4002");
  const res = await axios.get("http://localhost:4005/events");
  
  for (const event of res.data) {
    console.log("Processing event:", event.type);
    handleEvent(event.type, event.data);
  }
});
 