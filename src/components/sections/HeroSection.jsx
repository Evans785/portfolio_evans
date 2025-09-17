import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import PROFIL_IMG from "../../assets/images/robots.jpg";
import { containerVariant, itemVariant } from "../../utils/helper";
const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  return (
    <div
      className={`min-h-screen pt-16 transition-all duration-500 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-500"
      }`}
    >
      {/* section hero */}
      <motion.section id="home" style={{ y: heroY }}>
        <div className="min-h-screen flex items-center justify-center relative px-6 pt-8">
          {/* animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${
                isDarkMode ? "bg-blue-500" : "bg-blue-400"
              }`}
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-10 ${
                isDarkMode ? "bg-purple-500" : "bg-purple-400"
              }`}
            />
          </div>

          {/* main content */}
          <div className="max-w-7xl mx-auto w-full z-10 mt-20">
            {/* mobile layout */}
            <div className="block lg:hidden">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariant}
                className="text-center"
              >
                {/* profil image */}
                <motion.div variants={imageVariant} className="mb-8">
                  <div className="w-32 h-32 mx-auto relative">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`w-full h-32 rounded-2xl overflow-hidden border-4 ${
                        isDarkMode ? "border-gray-800" : "border-gray-300"
                      }`}
                    >
                      <img
                        src={PROFIL_IMG}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* decoration ring */}
                    <motion.div
                      animate={{ rotate: 300 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -inset-2 rounded-2xl border-blue-500/20"
                    />
                  </div>
                </motion.div>

                {/* content mail */}
                <motion.div
                  variants={textVariant}
                  className={`text-sm uppercase tracking-widest ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  } mb-4`}
                >
                  Developpeur Full Stack
                </motion.div>

                <motion.h1
                  variants={itemVariant}
                  className="text-3xl md:text-3xl font-light mb-6 leading-tight"
                >
                  <span
                    className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Façonner
                  </span>
                  <span className="text-red-500 font-medium ml-2">
                    l’expérience digitale
                  </span>
                  {/* <br /> */}
                  <span
                    className={` ml-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    qui a du sens
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariant}
                  className={`text-base md:text-lg ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } mb-8 max-w-xl mx-auto font-light leading-relaxed`}
                >
                  Je suis développeur full-stack, passionné par la création
                  d’applications web modernes et performantes. Mon expertise
                  couvre aussi bien le front-end que le back-end, ce qui me
                  permet de concevoir des solutions complètes allant de
                  l’interface utilisateur jusqu’à la gestion des données.
                </motion.p>

                {/* button pour mobile */}
                <motion.div
                  variants={itemVariant}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
                >
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection("work")}
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-medium transition-all duration-300"
                  >
                    Voir mes projets
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection("Contact")}
                    className={`border ${
                      isDarkMode
                        ? "border-gray-300 hover:border-gray-600 text-gray-300"
                        : "border-gray-300 hover:border-gray-400 text-gray-700"
                    } px-4 py-3 rounded-full text-sm uppercase tracking-widest font-medium transition-all duration-300`}
                  >
                    Contactez-moi
                  </motion.button>
                </motion.div>

                {/* social link */}
                <motion.div
                  variants={itemVariant}
                  className="flex justify-center space-x-6 mb-8"
                >
                  {[
                    { icon: FiGithub, href: "#" },
                    { icon: FiLinkedin, href: "#" },
                    { icon: Mail, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ y: -3, scale: 1.1 }}
                      className={`p-3 rounded-full transition-color ${
                        isDarkMode
                          ? "text-gray-400 hover:text-white hover:bg-gray-800"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* desktop layout */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
              {/* partie gauche */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariant}
              >
                <motion.div
                  variants={textVariant}
                  className={`text-sm uppercase tracking-widest ${
                    isDarkMode ? "text-gray-500" : "text-gray-800"
                  } mb-6`}
                >
                  Developpeur Full Stack
                </motion.div>

                <motion.h1
                  variants={itemVariant}
                  className="text-5xl xl:text-6xl font-light mb-8 leading-tight"
                >
                  <span
                    className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Façonner
                  </span>
                  <span className="text-red-500 font-medium ml-2 ">
                    l’expérience digitale
                  </span>
                  {/* <br /> */}
                  <span
                    className={`ml-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    qui a du sens
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariant}
                  className={`text-xl ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } mb-12 max-w-lg font-light leading-relaxed`}
                >
                  Je suis développeur full-stack, passionné par la création
                  d’applications web modernes et performantes. Mon expertise
                  couvre aussi bien le front-end que le back-end, ce qui me
                  permet de concevoir des solutions complètes allant de
                  l’interface utilisateur jusqu’à la gestion des données.
                </motion.p>

                {/* button desktop */}
                <motion.div variants={itemVariant} className="flex gap-6 mb-8">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection("work")}
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-medium transition-all duration-300"
                  >
                    Voir mes projets
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection("Contact")}
                    className={`border ${
                      isDarkMode
                        ? "border-gray-700 hover:border-gray-600 text-gray-300"
                        : "border-gray-300 hover:border-gray-400 text-gray-700"
                    } px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium transition-all duration-300`}
                  >
                    Contactez-moi
                  </motion.button>
                </motion.div>

                {/* social link desktop */}
                <motion.div
                  variants={itemVariant}
                  className="flex space-x-6 mb-13"
                >
                  {[
                    { icon: FiGithub, href: "#" },
                    { icon: FiLinkedin, href: "#" },
                    { icon: Mail, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ y: -3, scale: 1.1 }}
                      className={`p-3 rounded-full transition-color ${
                        isDarkMode
                          ? "text-gray-400 hover:text-white hover:bg-gray-800"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
              {/* partie droite */}
              <motion.div
                initial="hidden"
                variants={imageVariant}
                animate="visible"
                className="flex justify-center lg:justify-end"
              >
                <div className="relative">
                  <motion.div
                    variants={itemVariant}
                    className="flex item-center space-x-8 text-xs uppercase tracking-widest absolute -top-16 -left-28"
                  >
                    <span
                      className={`${
                        isDarkMode ? "text-gray-600" : "text-gray-500"
                      }`}
                    >
                      React
                    </span>
                    <span
                      className={`${
                        isDarkMode ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      .
                    </span>
                    <span
                      className={`${
                        isDarkMode ? "text-gray-600" : "text-gray-500"
                      }`}
                    >
                      Node js
                    </span>
                    <span
                      className={`${
                        isDarkMode ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      .
                    </span>
                    <span
                      className={`${
                        isDarkMode ? "text-gray-600" : "text-gray-500"
                      }`}
                    >
                      Javascript
                    </span>
                    <span
                      className={`${
                        isDarkMode ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      .
                    </span>
                    <span
                      className={`${
                        isDarkMode ? "text-gray-600" : "text-gray-500"
                      }`}
                    >
                      Firebase
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`w-80 h-96 rounded-3xl overflow-hidden border-4 ${
                      isDarkMode ? "border-gray-800" : "border-gray-400"
                    } shadow-2xl`}
                  >
                    <img
                      src={PROFIL_IMG}
                      alt="profil"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* decorative element */}

                  <motion.div
                    animate={{ rotate: 300 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-4 rounded-3xl border-blue-500/20"
                  />
                  <motion.div
                    animate={{ rotate: -300 }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-8 rounded-3xl border-purple-500/10"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ArrowDown
              size={20}
              className={isDarkMode ? "text-gray-600" : "text-gray-400"}
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HeroSection;
