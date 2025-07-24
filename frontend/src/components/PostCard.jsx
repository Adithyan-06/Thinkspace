import { Link } from "react-router";

export default function PostCard({ post }) {
  return (
    <Link
      to={`https://thinkspace-u51i.onrender.com/api/posts/${post._id}`}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-3xl mx-auto mb-6 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-cover w-full rounded-t-lg h-64 md:h-48 md:w-48 md:rounded-none md:rounded-s-lg"
        src={`http://localhost:5000/uploads/${post.thumbnail}`}
        alt={post.title}
      />
      <div className="flex flex-col justify-between p-4 leading-normal w-full">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {post.content.slice(0, 120)}...
        </p>
        <p className="text-sm text-gray-400 mt-2">By {post.author.username}</p>
      </div>
    </Link>
  );
}
