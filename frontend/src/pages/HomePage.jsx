import { useEffect, useState } from "react";
import API from "../lib/api";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await API.get("/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen dark:bg-gray-900 pt-10  px-4 bg-blue-50 ">
      <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-10">Latest Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <footer className="bg-white mt-60  w-full  dark:bg-gray-900 ">
        <div className=" max-w-6xl mx-auto p-4 text-center md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
              <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-green-700">Thinkspace</span>
              </a>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-green-700 sm:mb-0 ">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
              </ul>
          </div>
          <hr className="my-6 border-gray-200 w-full sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-black sm:text-center dark:text-white">© 2025 <a href="#" className="hover:underline text-green-700">Thinkspace™</a>. All Rights Reserved.</span>
        </div>
      </footer>
    </div>   
  );
}

