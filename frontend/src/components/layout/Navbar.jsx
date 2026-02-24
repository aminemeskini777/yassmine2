import { Bell, Menu, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header({ title, notificationsPath }) {
  const { user } = useAuth();
  const profileName =
    user?.name ||
    user?.full_name ||
    user?.username ||
    user?.prenom ||
    user?.first_name ||
    user?.email ||
    "Profile";

  return (
    <header className="h-16 bg-white dark:bg-gray-950 border-b flex items-center justify-between px-6 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="menu"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <Link
          to={notificationsPath}
          className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Bell size={20} />

          {/* Badge */}
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
            3
          </span>
        </Link>

        {/* Profile */}
        <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full hover:shadow-md transition">
          <UserCircle2 size={20} />
          <span className="text-sm font-medium hidden sm:block">
            {profileName}
          </span>
        </button>
      </div>
    </header>
  );
}
