import { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }: { postId: string }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content
      }); 
    } catch (error) {
      console.error(error);
    }

    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="content">New Comment</label>
          <input
            type="text"
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
