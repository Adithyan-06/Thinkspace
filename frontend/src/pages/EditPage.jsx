import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import API from "../lib/api";

export default function EditPage() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", content: "" });
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setForm({ title: res.data.title, content: res.data.content });
      } catch (err) {
        console.error("Failed to fetch post:", err);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${id}`, form);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900  dark:text-white flex justify-center items-center">
      <div className="w-full max-w-md md:max-w-200 mx-auto p-20 rounded-lg shadow-lg overflow-hidden mt-20  bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-green-700">Edit Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />

          <textarea name="content" value={form.content} onChange={handleChange} className="w-full p-2 border rounded h-32 dark:bg-gray-800" />

        

          <label htmlFor="thumbnailInput" className="cursor-pointer inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Choose New Thumbnail
          </label>
          <input
              id="thumbnailInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setThumbnail(e.target.files[0])}
          />

          <span className="text-sm text-gray-500">{thumbnail?.name || (typeof thumbnail === "string" ? thumbnail : "No file selected")}</span>

          <button className="w-full bg-green-700 text-white py-2 rounded cursor-pointer hover:bg-green-800">Update</button>
          </form>

      </div>
    </div>
  );
}
