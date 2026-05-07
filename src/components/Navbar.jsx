import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-end px-8 z-0">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">
          {user?.data?.email}
        </span>
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-200">
          {user?.data?.email?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
