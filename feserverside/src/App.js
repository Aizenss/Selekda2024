import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from "./blogs/blog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />} />
      </Routes>
    </Router>

  )
}

export default App