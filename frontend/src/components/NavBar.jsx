import { Link } from "react-router";
import { useAuth } from "../lib/authContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
      <Link to="/" className="text-3xl font-bold font-mono tracking-tight text-green-700">Thinkspace</Link>
      <div className="flex gap-4 items-center">
        <ThemeToggle  />
        {user ? (
          <>
            <span className="text-sm dark:text-white">Hi, {user.username}</span>
            <Link to="/create" className="text-white bg-green-700 hover:bg-green-800  focus:outline-none transition ease-in-out duration-300 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-0.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+ New Post</Link>
            <button onClick={logout} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 transition ease-in-out duration-300 focus focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-0.5 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 cursor-pointer">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 transition ease-in-out duration-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2  text-center ml-2 me-2 mb-0.5 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 ">Login</Link>
            <Link to="/register" className="text-white bg-green-700 hover:bg-green-800  focus:outline-none transition ease-in-out duration-300 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-0.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
