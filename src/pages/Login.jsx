import React from "react";
import AuthLayout from "../components/AuthLayout";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <AuthLayout title="Log In to MemNodes">
      <form className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400"
        />
        <button className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-300 transition">
          Log In
        </button>
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
