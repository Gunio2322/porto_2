import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import MarketingPage from "./pages/MarketingPage";
import Latest from "./pages/LatestPage";
import Post from "./components-blog/Post";
import MainContent from "./components-blog/Latest";
import DraftForm from "./pages/admin/CreatePostPage";
import GetPosts from "./pages/admin/GetPostsPage";
import BlogContent from "./pages/Blog";
// import EditorDraftPost from "./pages/admin/editPost";
import EditPost from "./pages/admin/EditPost";
import CreatePost from "./pages/admin-shop-pages/PanelShopAdmin";
import ProductsPage from "./pages/ShopPages/ProductsPage";
import Product from "./pages/ShopPages/ProductPages";
function App() {
  return (

      <div>
        <Routes>
          <Route path='/' element={<MarketingPage />} />
          <Route path="/blog" element={<BlogContent />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/post/:slug/:_id" element={<Post />} />
          <Route path="/test" element={<MainContent />} />
          <Route path="/admin/create" element={<DraftForm />} />
          <Route path="/admin/get" element={<GetPosts />} />
          <Route path="/admin/edit/:slug/:_id" element={<EditPost />} />
          <Route path="/admin/shop" element={<CreatePost />} />
          <Route path="/shop" element={<ProductsPage />} />
          <Route path="/product/:slug/:_id" element={<Product />} />
  
        </Routes>
      </div>

  );
}

export default App;
