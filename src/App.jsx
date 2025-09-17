import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import HeroSection from "./components/sections/HeroSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectSection from "./components/sections/ProjectSection";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/sections/Footer";
import AdminPanel from "./components/admin/AdminPanel";
import AdminLogin from "./components/admin/AdminLogin";
import UserApp from "./UserApp";
import { LanguageProvider } from "./context/LanguageContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { AdminAuthProvider } from "./context/AdminAuthContext";

// 🔹 Composant pour protéger les routes Admin
const ProtectedRoute = ({ isAdmin, children }) => {
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const App = () => {
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [adminEmail, setAdminEmail] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  // Récupérer email admin depuis Firestore
  useEffect(() => {
    const fetchAdminEmail = async () => {
      try {
        const docRef = doc(db, "config", "admin");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAdminEmail(docSnap.data().email);
        }
      } catch (err) {
        console.error("Erreur admin:", err);
      } finally {
        setIsChecking(false);
      }
    };
    fetchAdminEmail();
  }, []);

  // Observer l’utilisateur connecté
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUserEmail(user.email);
      else setCurrentUserEmail(null);
    });
    return () => unsub();
  }, []);

  const isAdmin =
    !isChecking && currentUserEmail && adminEmail === currentUserEmail;

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AdminAuthProvider>
          <Router>
            <Routes>
              {/* Partie utilisateur */}
              <Route
                path="/"
                element={
                  <div>
                    <Navbar />
                    <HeroSection />
                    <SkillsSection />
                    <ProjectSection />
                    <AboutSection />
                    <ContactSection />
                    <Footer />
                  </div>
                }
              />

              <Route path="/user" element={<UserApp />} />

              {/* Login Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Dashboard protégé */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute isAdmin={isAdmin}>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AdminAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
