const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const posts = {};

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  try {
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
    
    res.send({});
  } catch (error) {
    console.error("Error processing event:", error);
    res.status(500).send({ status: "ERROR", message: error.message });
  }
});

app.listen(4002, () => {
  console.log("Server is running on port 4002");
});
 