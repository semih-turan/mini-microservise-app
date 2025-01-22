import axios from "axios";
import { useState } from "react";
const PostCreate = () => {
    const [title, setTitle] = useState('');
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await axios.post('http://localhost:4000/posts', {
            title
        });
        setTitle('');
    }

    return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
            <input 
                id="title"
                className="form-control" 
                aria-label="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <button className="btn btn-primary">Submit</button>
    </form>
    </div>
  );
};  

export default PostCreate