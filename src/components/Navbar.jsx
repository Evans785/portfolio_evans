import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [adminEmail, setAdminEmail] = useState(null);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminEmail = async () => {
      try {
        const docRef = doc(db, "config", "admin");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAdminEmail(docSnap.data().email);
        }
      } catch (error) {
        console.error("Erreur récupération admin :", error);
      } finally {
        setIsCheckingAdmin(false);
      }
    };
    fetchAdminEmail();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUserEmail(user.email);
      else setCurrentUserEmail(null);
    });
    return () => unsubscribe();
  }, []);

  const normalizeSectionId = (name) =>
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

  const scrollToSection = (sectionName) => {
    const sectionId = normalizeSectionId(sectionName);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const showAdminButton =
    !isCheckingAdmin &&
    currentUserEmail &&
    adminEmail &&
    currentUserEmail === adminEmail;

  return (
    <motion.nav
      style={{ opacity: 1 }}
      className={`fixed top-0 w-full z-50 px-6 py-4 ${
        isDarkMode ? "bg-gray-950/80" : "bg-gray-50/80"
      } backdrop-blur-md border-b ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <Code2 size={24} className="text-red-500" />
          <span
            className={`text-lg ml-1 ${
              isDarkMode
                ? "bg-gradient-to-r from-white via-gray-300 to-white text-transparent bg-clip-text"
                : "text-black"
            }`}
          >
            EVANS
          </span>
        </motion.div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {["Home", "Compétences", "Projets", "À propos", "Contact"].map(
            (item) => (
              <motion.button
                key={item}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item)}
                className={`text-sm uppercase tracking-widest transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-300"
                }`}
              >
                {item}
              </motion.button>
            )
          )}

          {/* {showAdminButton && (
            <motion.button
              whileHover={{ y: -2 }}
              onClick={() => navigate("/admin/login")}
              className={`text-sm uppercase tracking-widest transition-colors ${
                isDarkMode
                  ? "text-yellow-400 hover:text-white"
                  : "text-yellow-600 hover:text-gray-900"
              }`}
            >
              Connexion
            </motion.button>
          )} */}

          {/* Darkmode toggle */}
          <motion.button
            whileHover={{ y: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          {/* Sélecteur langue */}
          {/* <select
            value={language}
            onChange={(e) => toggleLanguage(e.target.value)}
            className={`p-2 rounded-md text-sm ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select> */}
        </div>

        {/* Mobile menu */}
        <div className="flex md:hidden items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-900"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden mt-4 p-4 rounded-lg border shadow-lg transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >
            {["Home", "Compétences", "Projets", "À propos", "Contact"].map(
              (item) => (
                <motion.button
                  key={item}
                  whileHover={{ x: 5 }}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left py-2 text-sm uppercase tracking-widest transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item}
                </motion.button>
              )
            )}

            {/* 🔹 Mobile Admin */}
            {showAdminButton && (
              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => navigate("/admin/login")}
                className={`block w-full text-left py-2 text-sm uppercase tracking-widest transition-colors ${
                  isDarkMode
                    ? "text-yellow-400 hover:text-white"
                    : "text-yellow-600 hover:text-gray-900"
                }`}
              >
                Connexion
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
