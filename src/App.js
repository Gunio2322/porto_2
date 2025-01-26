import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

import MarketingPage from "./pages/MarketingPage";
import Blog from "./pages/Blog";
function App() {
  return (
<div>
<Routes>



        <Route path='/' element={<MarketingPage />}></Route>
        <Route path="/blog" element={<Blog />}></Route>



  

        </Routes>
     
        </div>
  );
}

export default App;
