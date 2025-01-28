import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

import MarketingPage from "./pages/MarketingPage";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
function App() {
  return (
    <div>
      <Routes>



        <Route path='/' element={<MarketingPage />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/post" element={<Post />}></Route>




      </Routes>

    </div>
  );
}

export default App;
