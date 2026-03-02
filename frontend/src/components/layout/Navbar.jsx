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

  const safeNotificationsPath = notificationsPath || "/notifications";

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-red-50"
            aria-label="menu"
          >
            <Menu size={18} />
          </button>

          <div className="flex flex-col leading-tight">
            <h1 className="text-base font-semibold text-slate-900 md:text-lg">{title}</h1>
            <span className="hidden text-xs text-slate-500 md:block">
              Tableau de pilotage manager
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            to={safeNotificationsPath}
            className="relative rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-red-50"
            aria-label="notifications"
          >
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              3
            </span>
          </Link>

          <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-orange-50 px-3 py-1.5 transition-colors hover:bg-red-50">
            <UserCircle2 size={18} className="text-slate-600" />
            <span className="hidden text-sm font-medium text-slate-700 sm:block">
              {profileName}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}


