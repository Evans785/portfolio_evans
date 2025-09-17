import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Eye, EyeOff } from "lucide-react";
import GoogleLogo from "../../assets/images/logo_google.png";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useTheme } from "../../context/ThemeContext";

const AdminLogin = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [adminEmail, setAdminEmail] = useState(null);

  const navigate = useNavigate();

  // 🔹 Récupérer l’email admin depuis Firestore
  useEffect(() => {
    const fetchAdminEmail = async () => {
      try {
        const docRef = doc(db, "config", "admin");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setAdminEmail(docSnap.data().email);
      } catch (err) {
        console.error("Erreur Firestore:", err);
      }
    };
    fetchAdminEmail();
  }, []);

  // 🔹 Redirection si admin déjà connecté
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === adminEmail) {
        navigate("/admin/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate, adminEmail]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user.email === adminEmail) {
        navigate("/admin/dashboard");
      } else {
        setError("🚫 Vous n'avez pas les droits admin.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      if (userCredential.user.email === adminEmail) {
        navigate("/admin/dashboard");
      } else {
        setError("🚫 Vous n'avez pas les droits admin.");
      }
    } catch {
      setError("❌ Impossible de se connecter avec Google.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <button
        onClick={toggleDarkMode}
        className="absolute top-5 right-5 p-2 rounded-full border transition hover:bg-gray-200/20"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-lg ${
          isDarkMode
            ? "bg-gray-800/80 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">🔐 Admin Login</h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 w-full rounded-lg border"
              required
            />
          </div>

          <div className="relative">
            <label className="mb-1 text-sm font-medium">Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 w-full rounded-lg border"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg text-white font-medium bg-red-500 hover:bg-red-600"
          >
            Se connecter
          </motion.button>
        </form>

        <div className="my-6 text-center text-gray-400">ou</div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border"
        >
          <img src={GoogleLogo} alt="Google" className="w-6 h-6 rounded-full" />
          <span>Se connecter avec Google</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
