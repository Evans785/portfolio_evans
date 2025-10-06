import { useState, useRef } from "react";
import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { Send } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { CONTACT_INFO, SOCIAL_LINKS } from "../../utils/data";
import { containerVariant, itemVariant } from "../../utils/helper";
import TextInput from "../input/TextInput";
import SuccessModel from "../SuccessModel";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { logSocialClick } from "../../utils/helper";
import toast, { Toaster } from "react-hot-toast"; // ajout toast

const ContactSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [callChoice, setCallChoice] = useState(false); // modal choix appel

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Tous les champs sont obligatoires !");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Veuillez entrer une adresse e-mail valide !");
      setIsSubmitting(false);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
      });

      setShowSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue. Réessayez plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCall = () => {
    setCallChoice(true);
  };

  const startCall = () => {
    window.location.href = "tel:+2250759884664";
  };

  const startWhatsApp = () => {
    const message = encodeURIComponent(
      "Bonjour ! Je souhaite discuter d'un projet."
    );
    window.open(`https://wa.me/+2250759884664?text=${message}`, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`py-24 px-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } relative overflow-hidden`}
    >
      <Toaster position="top-right" /> {/* toast */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-red-500" : "bg-red-400"
          }`}
        />
        <div
          className={`absolute bottom-40 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-400"
          }`}
        />
      </motion.div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariant}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariant}
            className={`text-sm uppercase tracking-widest ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } mb-4`}
          >
            Entrons en contact
          </motion.div>
          <motion.h2
            variants={itemVariant}
            className="text-3xl md:text-5xl font-light mb-6"
          >
            Contactez
            <span className="text-red-500 font-medium ml-2">-moi</span>
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Vous avez une idée en tête ? Transformons-la ensemble en réalité
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact form */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariant}
          >
            <motion.div
              variants={itemVariant}
              className={`p-8 rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                  : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
              }`}
            >
              <h3 className="text-2xl font medium mb-8">
                Envoie-moi un message
              </h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <TextInput
                    isDarkMode={isDarkMode}
                    value={formData.name}
                    handleInputChange={(text) =>
                      handleInputChange("name", text)
                    }
                    label="Ton nom"
                  />
                  <TextInput
                    isDarkMode={isDarkMode}
                    value={formData.email}
                    handleInputChange={(text) =>
                      handleInputChange("email", text)
                    }
                    label="Adresse e-mail"
                  />
                </div>
                <TextInput
                  isDarkMode={isDarkMode}
                  label="Votre message"
                  value={formData.message}
                  textarea
                  handleInputChange={(text) =>
                    handleInputChange("message", text)
                  }
                />
                <motion.button
                  disabled={isSubmitting}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 
             bg-red-500 hover:bg-red-600 disabled:bg-red-400 
             text-white py-4 rounded-xl text-sm uppercase 
             tracking-widest font-medium transition-all duration-300"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Envoi...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Envoyez un message</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact info && social link */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariant}
            className="space-y-8"
          >
            {/* Contact info */}
            <motion.div variants={itemVariant}>
              <h3 className="text-2xl font-medium mb-6">
                Informations de contact
              </h3>
              <div className="space-y-4">
                {CONTACT_INFO.map((info, index) => (
                  <motion.div
                    key={info.label}
                    variants={itemVariant}
                    whileHover={{ x: 4 }}
                    className={`flex items-center space-x-4 rounded-xl ${
                      isDarkMode
                        ? "bg-gray-800/30 hover:bg-gray-800/50"
                        : "bg-gray-50/50 hover:bg-gray-100/50"
                    } transition-all duration-300`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-white"
                      }`}
                    >
                      <info.icon size={20} className="text-red-500" />
                    </div>
                    <div>
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-gray-500" : "text-gray-600"
                        }`}
                      >
                        {info.label}
                      </div>
                      <div className="font-medium">{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* social link */}
            <motion.div variants={itemVariant}>
              <h3 className="text-xl font-medium mb-6">Suivez moi</h3>
              <div className="grid grid-cols-2 gap-4">
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                        : "bg-white/80 border-gray-200 hover:border-gray-300"
                    } ${social.bgColor} ${social.color}`}
                    onClick={() => logSocialClick(social.name)}
                  >
                    <social.icon size={20} />
                    <span className="font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* available statut */}
            <motion.div
              variants={itemVariant}
              className={`p-6 rounded-xl border ${
                isDarkMode
                  ? "bg-green-500/10 border-green-500/20"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium text-green-500">
                  Ouvert aux collaborations
                </span>
              </div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Disponible pour de nouvelles missions freelance et
                collaborations professionnelles.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* bottom cta */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariant}
          className="text-center mt-20"
        >
          <motion.div
            variants={itemVariant}
            className={`max-w-2xl mx-auto p-8 rounded-2xl border ${
              isDarkMode
                ? "bg-gray-800/30 border-gray-700"
                : "bg-gray-50/50 border-gray-200"
            }`}
          >
            <h3 className="font-medium text-xl mb-4">
              Dispo pour un call express
            </h3>
            <p
              className={`${
                isDarkMode ? "text-gray-4000" : "text-gray-600"
              } mb-6`}
            >
              Parfois, une conversation en dit plus que mille messages.
              Planifions un appel et donnons vie à vos idées !
            </p>
            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-full border font-medium transition-all duration-300 ${
                isDarkMode
                  ? "border-gray-600 hover:border-red-500 hover:text-red-500"
                  : "border-gray-300 hover:border-red-500 hover:text-red-600"
              }`}
              onClick={handleCall}
            >
              Planifier un appel
            </motion.button>

            {/* modal choix appel */}
            {callChoice && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl space-y-4">
                  <h3 className="text-lg font-medium mb-2">
                    Choisissez une option
                  </h3>
                  <div className="flex gap-4">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      onClick={() => {
                        startCall();
                        setCallChoice(false);
                      }}
                    >
                      Appel direct
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      onClick={() => {
                        startWhatsApp();
                        setCallChoice(false);
                      }}
                    >
                      WhatsApp
                    </button>
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                      onClick={() => setCallChoice(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
      <SuccessModel
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        isDarkMode={isDarkMode}
      />
    </section>
  );
};

export default ContactSection;
