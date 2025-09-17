// src/utils/cvStats.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";


export const logCvAction = async (actionType) => {
  try {
    await addDoc(collection(db, "cv_stats"), {
      action: actionType,
      createdAt: serverTimestamp(),
    });
    console.log(`✅ CV ${actionType} enregistré`);
  } catch (error) {
    console.error("❌ Erreur Firestore:", error);
  }
};

export const logSocialClick = async (socialName) => {
  try {
    await addDoc(collection(db, "social_clicks"), {
      socialName,          
      createdAt: serverTimestamp(),
    });
    console.log(`Click logged: ${socialName}`);
  } catch (err) {
    console.error("Erreur logSocialClick:", err);
  }
};

export const logCallRequest = async () => {
  try {
    await addDoc(collection(db, "call_requests"), {
      createdAt: serverTimestamp(),
    });
    console.log("Call request logged");
  } catch (err) {
    console.error("Erreur logCallRequest:", err);
  }
};





export  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  export const itemVariant = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };