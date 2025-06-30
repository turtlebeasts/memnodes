import AuthLayout from "../components/AuthLayout";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <AuthLayout title="Create Your MemNodes Account">
      <form className="space-y-5">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400"
        />
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
          Sign Up
        </button>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
