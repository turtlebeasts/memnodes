export default function Footer() {
  return (
    <footer className="text-center text-gray-500 text-sm py-6 border-t border-white/10 bg-black">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">MemNodes</span>. All rights
        reserved.
      </p>
    </footer>
  );
}
