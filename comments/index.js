const express = require("express");
const bodyParser = require("body-parser"); // bodyParser is a middleware that parses the body of the request
const { randomBytes } = require("crypto"); // randomBytes is a function that generates a random string of bytes
const cors = require("cors"); // cors is a middleware that allows cross-origin requests

const app = express();
app.use(bodyParser.json()); // bodyParser is a middleware that parses the body of the request
app.use(cors()); // cors is a middleware that allows cross-origin requests

const commentsByPostId = {}; // commentsByPostId is an object that stores the comments for each post

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || []; // comments is an array that stores the comments for the post
    comments.push({ id: commentId, content }); // push is a function that adds an element to the end of an array
    commentsByPostId[req.params.id] = comments; // commentsByPostId is an object that stores the comments for each post
    res.status(201).send(comments); // res.status(201).send(comments) is a function that sends a response with a status code of 201 and the comments
});

app.listen(4001, () => {
    console.log("Server is running on port 4001");
});
