import { Routes, Route } from "react-router";
import Navbar from "../components/NavBar";
import Register from "../pages/Register";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Blog from "../pages/Blog";
import CreatePage from "../pages/CreatePage";
import EditPage from "./EditPage";
import { useLocation } from "react-router";



function MainLayout() {
  const location = useLocation();
  const showNavbar = location.pathname === "https://thinkspace-u51i.onrender.com/api/" || location.pathname.startsWith("https://thinkspace-u51i.onrender.com/api/posts");

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:id" element={<Blog />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default MainLayout;