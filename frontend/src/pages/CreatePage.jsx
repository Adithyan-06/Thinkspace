import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../lib/api";

export default function CreatePage() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [thumbnail, setThumbnail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await API.post("https://thinkspace-u51i.onrender.com/api/posts", formData);
      navigate("/");
    } catch (err) {
      alert("Post creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 dark:text-white flex justify-center items-center">
      <div className="w-full max-w-md md:max-w-200 mx-auto p-20  rounded-lg shadow-lg overflow-hidden mt-20 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-green-700">Create Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Title" className="w-full p-2 border rounded border-gray-600 dark:bg-gray-700" onChange={handleChange} required />
          <textarea name="content" placeholder="Content" className="w-full p-2 border rounded h-32 border-gray-600 dark:bg-gray-700" onChange={handleChange} required />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thumbnail</label>
          <div className="flex items-center gap-3">
            <label    htmlFor="thumbnailInput"    className="cursor-pointer inline-block px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800">Choose Thumbnail</label>
            <span className="text-sm text-gray-500">{thumbnail?.name || "No file selected"}</span>
          </div>
          <input  id="thumbnailInput"  type="file"  accept="image/*"  className="hidden"  onChange={(e) => setThumbnail(e.target.files[0])}/>
          <button className="w-full bg-green-700 hover:bg-green-800 cursor-pointer text-white py-2 rounded">Post</button>
        </form>
      </div>
    </div>
  );
}
