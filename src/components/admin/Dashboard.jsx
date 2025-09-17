import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [cvStats, setCvStats] = useState([]);
  const [socialClicks, setSocialClicks] = useState([]);
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchCollection = async (name) => {
        const q = query(collection(db, name), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      };

      setMessages(await fetchCollection("messages"));
      setVisitors(await fetchCollection("visiteurs"));
      setCvStats(await fetchCollection("cv_stats"));
      setSocialClicks(await fetchCollection("social_clicks"));
      setCalls(await fetchCollection("calls"));
    };

    fetchData();
  }, []);

  // Graphiques
  const cvChartData = {
    labels: ["Vus", "Téléchargés"],
    datasets: [
      {
        data: [
          cvStats.filter((c) => c.action === "view").length,
          cvStats.filter((c) => c.action === "download").length,
        ],
        backgroundColor: ["#ef4444", "#3b82f6"],
      },
    ],
  };

  const socialChartData = {
    labels: socialClicks.map((s) => s.socialName),
    datasets: [
      {
        label: "Clicks",
        data: socialClicks.map((s, i) => 1), // chaque doc = 1 clic
        backgroundColor: "#f97316",
      },
    ],
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Analytics</h1>

      {/* Compteurs */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-gray-500 dark:text-gray-300">Messages</p>
          <h2 className="text-3xl font-bold">{messages.length}</h2>
        </motion.div>

        <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-gray-500 dark:text-gray-300">Visiteurs</p>
          <h2 className="text-3xl font-bold">{visitors.length}</h2>
        </motion.div>

        <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-gray-500 dark:text-gray-300">CV Vus</p>
          <h2 className="text-3xl font-bold">
            {cvStats.filter((c) => c.action === "view").length}
          </h2>
        </motion.div>

        <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-gray-500 dark:text-gray-300">CV Téléchargés</p>
          <h2 className="text-3xl font-bold">
            {cvStats.filter((c) => c.action === "download").length}
          </h2>
        </motion.div>

        <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-gray-500 dark:text-gray-300">Social Clicks</p>
          <h2 className="text-3xl font-bold">{socialClicks.length}</h2>
        </motion.div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">CV Stats</h2>
          <Doughnut data={cvChartData} />
        </motion.div>

        <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Social Clicks</h2>
          <Bar data={socialChartData} />
        </motion.div>
      </div>

      {/* Liste des appels et messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Messages reçus</h2>
          <ul className="space-y-2 max-h-64 overflow-auto">
            {messages.map((m) => (
              <li key={m.id} className="border-b py-2">
                <strong>{m.name}</strong> - {m.email} <br />
                {m.message}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Demandes d'appels</h2>
          <ul className="space-y-2 max-h-64 overflow-auto">
            {calls.map((c) => (
              <li key={c.id} className="border-b py-2">
                <strong>{c.name}</strong> - {c.email} - {c.phone}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
