import React from "react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Sun, Moon, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Dashboard from "./Dashboard";
import Setting from "./Setting";
import Messages from "./Messages";
import User from "./User";
import { useTheme } from "../../context/ThemeContext";

const AdminPanel = ({ setIsAdminLoggedIn }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth); // 🔹 Déconnexion Firebase
      setIsAdminLoggedIn(false); // 🔹 Déconnexion du context admin
      navigate("/"); // 🔹 Retour vers le frontend public
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded hover:text-red-500 ${
      isActive ? "bg-red-500/20" : ""
    } transition`;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        {/* Header + Dark Mode */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center gap-2 p-2 rounded border border-gray-600 hover:bg-gray-700 transition"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 flex-1">
          <NavLink to="/admin/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/setting" className={linkClass}>
            Settings
          </NavLink>
          <NavLink to="/admin/messages" className={linkClass}>
            Messages
          </NavLink>
          <NavLink to="/admin/user" className={linkClass}>
            Users
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded border border-gray-600 hover:bg-gray-700 transition w-full"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="setting" element={<Setting />} />
            <Route path="messages" element={<Messages />} />
            <Route path="user" element={<User />} />
          </Routes>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminPanel;
