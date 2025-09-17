import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe(); // Clean up
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📩 Messages reçus</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">Aucun message reçu pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-4 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {msg.createdAt?.toDate().toLocaleString() || "Date inconnue"}
              </p>
              <h3 className="text-lg font-semibold">{msg.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {msg.email}
              </p>
              <p className="mt-2">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
