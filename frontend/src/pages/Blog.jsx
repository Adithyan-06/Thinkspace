import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import API from "../lib/api";
import { useAuth } from "../lib/authContext";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await API.get(`https://thinkspace-u51i.onrender.com/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
      }
    }
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Failed to delete post");
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`); // make sure edit page exists
  };

  if (!post) return <div>Loading...</div>;

  const isAuthor = user && user._id === post.author._id;

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 flex justify-center items-center">
      <div className="w-full max-w-md md:max-w-200 mx-auto p-20 bg-white dark:bg-gray-800 dark:text-white  rounded-lg">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 mb-4 dark:text-white">by {post.author.username}</p>
        {post.thumbnail && (
          <img
            src={`https://thinkspace-u51i.onrender.com/uploads/${post.thumbnail}`}
            alt="Thumbnail"
            className="w-full rounded mb-4"
          />
        )}
        <p className="text-lg leading-relaxed mb-25">{post.content}</p>

        {isAuthor && (
          <div className="flex gap-4">
            <button
              onClick={handleEdit}
              className="bg-green-700 hover:bg-green-800 cursor-pointer text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
