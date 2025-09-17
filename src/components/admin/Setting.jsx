import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateEmail, updatePassword, signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

const Setting = ({ setIsAdminLoggedIn }) => {
  const [form, setForm] = useState({ name: "", title: "", email: "" });
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!auth.currentUser) return;
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setForm({
            name: data.name || "",
            title: data.title || "",
            email: auth.currentUser.email,
          });
          setNotifications(data.notifications ?? true);
          setDarkMode(data.darkMode ?? false);
          setLanguage(data.language ?? "fr");
        } else {
          // Si pas de doc, créer un document vide
          await setDoc(userRef, {
            name: "",
            title: "",
            notifications: true,
            darkMode: false,
            language: "fr",
          });
        }
      } catch (err) {
        console.error("Erreur fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSaveProfile = async () => {
    if (!auth.currentUser) return;
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        userRef,
        {
          name: form.name,
          title: form.title,
        },
        { merge: true }
      );
      alert("Profil sauvegardé !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde du profil.");
    }
  };

  const handleUpdateEmail = async () => {
    try {
      if (auth.currentUser) {
        await updateEmail(auth.currentUser, form.email);
        alert("Email mis à jour !");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (auth.currentUser && newPassword.length >= 6) {
        await updatePassword(auth.currentUser, newPassword);
        alert("Mot de passe mis à jour !");
        setNewPassword("");
      } else {
        alert("Mot de passe trop court !");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleSaveSettings = async () => {
    if (!auth.currentUser) return;
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        userRef,
        { notifications, darkMode, language },
        { merge: true }
      );
      alert("Paramètres sauvegardés !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde des paramètres.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAdminLoggedIn(false);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-4xl mx-auto space-y-8"
    >
      <h1 className="text-3xl font-bold mb-6">Paramètres du profil</h1>

      {/* Profil utilisateur */}
      <section className="space-y-4 p-6 border rounded-xl bg-gray-50 dark:bg-gray-800">
        <h2 className="text-xl font-semibold">Profil utilisateur</h2>
        <input
          type="text"
          placeholder="Nom / Pseudo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="text"
          placeholder="Titre / Poste"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleSaveProfile}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Sauvegarder
        </button>
      </section>

      {/* Compte & Sécurité */}
      <section className="space-y-4 p-6 border rounded-xl bg-gray-50 dark:bg-gray-800">
        <h2 className="text-xl font-semibold">Compte & Sécurité</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleUpdateEmail}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Mettre à jour l'email
        </button>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleUpdatePassword}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Mettre à jour le mot de passe
        </button>
      </section>

      {/* Notifications & Langue */}
      <section className="space-y-4 p-6 border rounded-xl bg-gray-50 dark:bg-gray-800">
        <h2 className="text-xl font-semibold">Notifications & Langue</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Activer notifications
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          Mode sombre
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-4 py-2 rounded border"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
        <button
          onClick={handleSaveSettings}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Sauvegarder les paramètres
        </button>
      </section>

      {/* Déconnexion */}
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded"
      >
        <LogOut size={20} /> Déconnexion
      </motion.button>
    </motion.div>
  );
};

export default Setting;
