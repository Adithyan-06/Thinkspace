import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/authContext";
import API from "../lib/api";
import { Link } from "react-router";
import { EyeIcon, EyeOffIcon } from 'lucide-react';


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("https://thinkspace-u51i.onrender.com/api/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 flex justify-center items-center">
      <div className="w-full max-w-md md:max-w-140 p-10 rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="relative space-y-6">
          <label className="dark:text-white">Email address</label>
          <input name="email" type="email" placeholder="Enter your email" className="w-full p-2 border rounded-lg border-gray-600 dark:bg-gray-700 focus:outline-none dark:text-white" onChange={handleChange} required />
          <label className="dark:text-white">Password</label>
          <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full p-2 border rounded-lg border-gray-600 dark:bg-gray-700 focus:outline-none dark:text-white" onChange={handleChange} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-34 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          <button className="w-full text-white bg-green-700 hover:bg-green-800 transition ease-in-out duration-300 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 cursor-pointer">Login</button>
        </form>
        <p className="text-center mt-4 dark:text-white">Dont have an account? <Link to="/register" className="text-green-700">Register</Link></p>
      </div>
    </div>
  );
}
