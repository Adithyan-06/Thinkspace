import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/authContext";
import API from "../lib/api";
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 flex justify-center items-center">
      <div className="w-full max-w-md md:max-w-140 p-10 rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-green-700">Create Account</h2>
        <form onSubmit={handleSubmit} className="relative space-y-6">
          <label className="dark:text-white">Username</label><br />
          <input name="username" placeholder="Enter your username" className="w-full p-2 border rounded-lg border-gray-600 dark:bg-gray-700 dark:text-white " onChange={handleChange} required />
          <label className="dark:text-white">Email Address</label><br />
          <input name="email" type="email" placeholder="Enter your email" className="w-full p-2 border rounded-lg border-gray-600 dark:bg-gray-700 dark:text-white" onChange={handleChange} required />
          <label className="dark:text-white">Password</label><br />
          <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full p-2 border rounded-lg border-gray-600 dark:bg-gray-700 focus:outline-none dark:text-white" onChange={handleChange} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-56 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          <button className="w-full text-white bg-green-700 hover:bg-green-800 transition ease-in-out duration-300 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 cursor-pointer">Register</button>
        </form>
      </div>
    </div>
  );
}
