import { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";

interface Post {
  id: string;
  title: string;
}

const PostLists = () => {
  const [posts, setPosts] = useState<Record<string, Post>>({});

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:4000/posts");

    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostLists;
