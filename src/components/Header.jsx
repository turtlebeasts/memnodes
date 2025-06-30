import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full px-6 lg:px-20 py-4 border-b border-white/10 flex items-center justify-between bg-black">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        <span className="text-white">Mem</span>
        <span className="text-white/50 font-light">Nodes</span>
      </Link>
      <nav className="space-x-4 hidden md:block">
        <Link to="/login" className="text-gray-300 hover:text-white transition">
          Login
        </Link>
        <Link
          to="/register"
          className="text-gray-300 hover:text-white transition"
        >
          Register
        </Link>
      </nav>
    </header>
  );
}
