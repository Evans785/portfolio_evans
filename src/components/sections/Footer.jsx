import { useRef } from "react";
import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { Mail, Heart, ArrowUp, Code2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { containerVariant, itemVariant } from "../../utils/helper";
import { SOCIAL_LINKS } from "../../utils/data";
const Footer = () => {
  const { isDarkMode } = useTheme();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, {
    once: true,
    margin: "-50px",
  });
  const { scrollYProgress } = useScroll();
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const social_link = [
    {
      name: "Github",
      icon: FiGithub,
      url: "",
      color: "hover:text-gray-400",
    },
    {
      name: "Linkedin",
      icon: FiLinkedin,
      url: "",
      color: "hover:text-blue-500",
    },
    {
      name: "Twitter",
      icon: FiTwitter,
      url: "",
      color: "hover:text-sky-500",
    },
    {
      name: "Email",
      icon: Mail,
      url: "",
      color: "hover:text-green-400",
    },
  ];
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  {
    /* animation gradient */
  }
  const AnimateGradientLine = () => (
    <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
      <motion.div
        className={`h-px gradient-to-r ${
          isDarkMode
            ? "from-transparent via-red-500 to-transparent"
            : "from-transparent via-red-600 to-transparent"
        }`}
        initial={{ width: "0%", opacity: 0 }}
        animate={isInView ? { width: "100%", opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <motion.div
          className={`absolute h-px top-0 w-32 bg-gradient-to-r ${
            isDarkMode
              ? "from-red-400 via-purple-500 to-red-400"
              : "from-red-400 via-purple-600 to-red-500"
          }`}
          animate={{ x: ["-50%", "calc(100vw + 50%)"] }}
          transition={{
            x: {
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
        />
      </motion.div>
    </div>
  );
  return (
    <footer
      ref={footerRef}
      className={`relative ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } overflow-hidden`}
    >
      <AnimateGradientLine />
      {/* background element */}
      <motion.div
        style={{ y: scrollY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div
          className={`absolute bottom-10 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-3 ${
            isDarkMode ? "bg-red-500" : "bg-red-400"
          }`}
        />
        <div
          className={`absolute top-10 right-1/3 w-48 h-48 rounded-full blur-3xl opacity-3 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-400"
          }`}
        />
      </motion.div>
      <div className="z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariant}
            className="text-center space-y-8"
          >
            {/* logo brand */}
            <motion.div variants={itemVariant} className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="inline-flex items-center space-x-2 text-2xl font-medium"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-red-500"
                >
                  <Code2 size={28} />
                </motion.div>
                <span className="">Evans Adjé</span>
              </motion.div>
              <motion.p
                variants={itemVariant}
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } max-w-md mx-auto`}
              >
                Créer des expériences digitales avec passion, précision et une
                touche de magie 
              </motion.p>
            </motion.div>
            {/* social link */}
            <motion.div
              variants={itemVariant}
              className="flex justify-center space-x-6"
            >
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2, rotate: [0, -5, 5, 0] }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: index * 0.1 + 0.5,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className={`p-3 rounded-full border transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800/50 border-gray-700/50"
                      : "bg-gray-100/50  hover:bg-gray-200"
                  } ${social.color} backdrop-blur-sm`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
            {/* divider */}
            <motion.div
              variants={itemVariant}
              className="flex items-center justify-center space-x-4"
            >
              <div
                className={`h-px w-16 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-red-500"
              >
                <Heart size={16} fill="currentColor" />
              </motion.div>
              <div
                className={`h-px w-16 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              />
            </motion.div>
            {/* copyright */}
            <motion.div variants={itemVariant} className="space-y-2">
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-500" : "text-gray-600"
                }`}
              >
                ©{new Date().getFullYear()} Evans. Tous droits réservés
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-600" : "text-gray-500"
                }`}
              >
                Conçu avec React && Framer Motion
              </p>
            </motion.div>
            {/* back to button */}
            <motion.div variants={itemVariant}>
              <motion.button
                onClick={scrollToTop}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white"
                    : "bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 hover:text-gray-900"
                } backdrop-blur-sm ${
                  isDarkMode ? "border-gray-700" : "border-gray-300"
                }`}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: isDarkMode
                    ? "0 18px 25px rgba(59,130,246,0.15)"
                    : "0 18px 25px rgba(59,130,246,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp size={16} />
                <span> Retour en haut</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
