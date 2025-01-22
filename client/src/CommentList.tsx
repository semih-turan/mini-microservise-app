import { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<{ id: string; content: string }[]>(
    []
  );

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/posts/${postId}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [postId]);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
