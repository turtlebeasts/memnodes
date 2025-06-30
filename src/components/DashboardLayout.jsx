import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function DashboardLayout() {
  const { pathname } = useLocation();

  const navItems = [
    { name: "My Timelines", path: "/dashboard/" },
    { name: "Create New", path: "/dashboard/create" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar Navigation */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="w-64 bg-white/5 border-r border-white/10 p-6 flex flex-col space-y-6 shadow-lg"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold tracking-wide mb-8"
        >
          Mem<span className="font-light text-white/50">Nodes</span>
        </motion.h2>
        <nav className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`text-sm font-medium px-3 py-2 rounded-md transition duration-300
                  ${
                    pathname === item.path
                      ? "bg-white text-black"
                      : "hover:bg-white/10"
                  }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex-1 p-10 overflow-y-auto"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
