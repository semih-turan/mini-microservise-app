import { useState, useEffect } from "react";
import PostCreate from "./PostCreate";
import PostLists from "./PostLists";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    const body = document.body;

    if (isDarkTheme) {
      document.documentElement.setAttribute("data-bs-theme", "light");
      body.className = "bg-light";
    } else {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      body.className = "bg-dark";
    }
  };

  useEffect(() => {
    const body = document.body;
    body.className = isDarkTheme ? "bg-dark" : "bg-light";
  }, []);

  return (
    <div
      className={`${isDarkTheme ? "bg-dark text-light" : "bg-light text-dark"}`}
    >
      <div className="container-fluid p-3">
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-secondary" onClick={toggleTheme}>
            {isDarkTheme ? (
              <i className="bi bi-sun-fill"></i>
            ) : (
              <i className="bi bi-moon-fill"></i>
            )}
          </button>
        </div>
        <h1 className="text-center">Mini Microservice App</h1>
        <div className="container">
          <h1>Create Post</h1>
          <PostCreate />
        </div>
        <div className="container">
          <h1>Posts</h1>
          <PostLists isDarkTheme={isDarkTheme} />
        </div>
      </div>
    </div>
  );
}

export default App;
