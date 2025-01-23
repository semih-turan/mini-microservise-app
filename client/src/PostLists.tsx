import { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

interface Post {
  id: string;
  title: string;
  comments: {
    id: string;
    content: string;
  }[];
}

const PostLists = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  const [posts, setPosts] = useState<Record<string, Post>>({});

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:4002/posts");
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
        className={`card ${isDarkTheme ? "bg-dark-subtle" : "bg-light"}`}
        style={{ width: "30%", marginBottom: "20px" }}
      >
        <div className="card-body">
          <h3 className={isDarkTheme ? "text-light" : "text-dark"}>
            {post.title}
          </h3>
          <CommentList comments={post.comments} />
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
