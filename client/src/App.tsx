import PostCreate from "./PostCreate";
import PostLists from "./PostLists";

function App() {
  return (
    <>
      <h1 className="text-center">Mini Microservice App</h1>
      <div className="container">
        <h1>Create Post</h1>
        <PostCreate />
      </div>
      <div className="container">
        <h1>Posts</h1>
        <PostLists />
      </div>
    </>
  );
}

export default App;
