import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Leads", path: "/leads" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col shadow-xl z-10">
      {/* App Name */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wider text-blue-400">
          CRM SYSTEM
        </h1>
        <hr className="h-px my-8 bg-neutral-quaternary border-0" />
      </div>
      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
