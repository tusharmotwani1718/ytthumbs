import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login as loginSlice } from "../../../../redux/slices/authSlice.js";
import { useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if(email == "tusharmotwani89@gmail.com" && password == "password123") {
      // TODO: Integrate backend API here
      // Example: authenticate({ email, password });
      dispatch(loginSlice({ email, password }));
      navigate("/user");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#18181b] flex flex-col justify-center items-center">
      <div className="w-full max-w-lg bg-[#232326] border border-[#232] rounded-2xl shadow-2xl px-8 py-10">
        <h1 className="text-4xl font-extrabold text-red-600 mb-2 text-center tracking-wide">
          Welcome Back to YTThumbs
        </h1>
        <p className="text-gray-400 text-center mb-7 text-lg">
          Login to create eye-catching thumbnails in seconds.
        </p>
        {error && (
          <div className="mb-5 text-red-500 font-semibold bg-red-100 px-4 py-2 rounded">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-5 py-4 bg-[#18181b] text-gray-100 rounded-xl border border-[#333] focus:border-red-600 focus:ring-2 focus:ring-red-600 transition"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-5 py-4 bg-[#18181b] text-gray-100 rounded-xl border border-[#333] focus:border-red-600 focus:ring-2 focus:ring-red-600 transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg text-xl transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
