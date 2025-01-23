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
      console.log("Post created:", posts[id]);
    }

    if (type === "CommentCreated") {
      const { id, content, postId } = data;
      const post = posts[postId];
      if (post) {
        post.comments.push({ id, content });
        console.log("Comment added to post:", postId);
      }
    }

    console.log("Current posts state:", posts);
    res.send({ status: "OK" });
  } catch (error) {
    console.error("Error processing event:", error);
    res.status(500).send({ status: "ERROR", message: error.message });
  }
});

app.listen(4002, () => {
  console.log("Server is running on port 4002");
});
 