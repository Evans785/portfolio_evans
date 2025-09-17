// setAdmin.cjs
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // ton fichier JSON

// Initialiser Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// UID de ton utilisateur admin
const uid = "6yVI2WzjSsUT6CLBhwZ0Vw8CM6J2";

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("✅ Utilisateur défini comme admin !");
  })
  .catch((error) => {
    console.error("❌ Erreur :", error);
  });
