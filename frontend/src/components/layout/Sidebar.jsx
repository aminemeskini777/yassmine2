import {
  Award,
  BarChart3,
  Briefcase,
  ClipboardList,
  Gauge,
  LogOut,
  Settings,
  Shield,
  Users,
  UserRound,
  PlusCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const employeeItems = [
  ["Dashboard", "/dashboard", Gauge],
  ["Vue unifiee", "/tasks", ClipboardList],
  ["Mes badges", "/badges", Award],
  ["Mon profil", "/profile", UserRound],
];

const managerItems = [
  ["Dashboard equipe", "/manager/dashboard", Gauge],
  ["Vue unifiee equipe", "/manager/tasks", ClipboardList],
  ["Creer tache", "/manager/tasks/create", PlusCircle],
  ["Gestion badges", "/manager/badges", Award],
  ["Utilisateurs", "/manager/users", Users],
  ["Creer employe", "/manager/users/create", UserRound],
  ["Configuration JIRA", "/manager/jira", Shield],
  ["Rapports", "/manager/reports", BarChart3],
  ["Equipes", "/manager/teams", Briefcase],
];

export default function Sidebar({ role, pathname }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const links = role === "manager" ? managerItems : employeeItems;

  async function onLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-950 border-r flex flex-col justify-between p-6 shadow-sm">

      
      <div>
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg mb-8">
          <Shield size={18} />
          TAKEIT
        </div>

        <div className="text-xs uppercase text-gray-400 mb-3 tracking-wider">
          {role === "manager" ? "Manager" : "Employe"}
        </div>

        
        <nav className="space-y-2">
          {links.map(([label, to, Icon]) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    active
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      
      <div className="space-y-2">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
        >
          <Settings size={18} />
          Parametres
        </Link>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        >
          <LogOut size={18} />
          Deconnexion
        </button>
      </div>
    </aside>
  );
}
