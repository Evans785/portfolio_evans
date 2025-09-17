import { useRef } from "react";
import { EyeIcon, DownloadIcon } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { JOURNEY_STEPS, PASSION } from "../../utils/data";
import SIGNATURE from "../../assets/images/signature.svg";
import { containerVariant, itemVariant } from "../../utils/helper";
import { logCvAction } from "../../utils/helper";

const AboutSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const timeLineRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });
  const timeLineInview = useInView(timeLineRef, {
    once: true,
    margin: "-50px",
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const timeLineVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const stepVariant = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  return (
    <section
      id="a-propos"
      ref={sectionRef}
      className={`py-24 px-5 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } relative overflow-hidden`}
    >
      {/* background element */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-40 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-red-500" : "bg-red-400"
          }`}
        />
        <div
          className={`absolute bottom-20 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-5 ${
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
          className="text-center mb-28"
        >
          <motion.div
            variants={itemVariant}
            className={`text-sm uppercase tracking-widest ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } mb-4`}
          >
            Apprends à me connaître
          </motion.div>
          <motion.h2
            variants={itemVariant}
            className="text-3xl md:text-5xl font-light mb-6"
          >
            À propos
            <span className="text-red-500 font-medium ml-2">de moi</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* personal story */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariant}
            className="space-y-8"
          >
            <motion.div
              variants={itemVariant}
              className={`p-8 rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                  : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
              } mb-4`}
            >
              <h3 className="text-2xl font-medium mb-6">Ma mission</h3>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                Ma mission est de concevoir des solutions digitales modernes,
                performantes et accessibles. J’ai à cœur de transformer des
                idées en applications concrètes qui améliorent l’expérience des
                utilisateurs et apportent une réelle valeur ajoutée aux projets.
              </p>
              <p
                className={`text-base leading-relaxed ${
                  isDarkMode ? "text-white/90" : "text-gray-600"
                }`}
              >
                Quand je ne code pas, vous me trouverez à expérimenter de
                nouvelles technologies web, optimiser des applications
                existantes et concevoir des solutions innovantes pour répondre
                aux défis numériques modernes.
              </p>
            </motion.div>

            {/* what i love building */}
            <motion.div variants={itemVariant} className="space-y-4">
              <h3 className="text-xl font-medium mb-6">
                J’aime concevoir et développer des solutions technologiques
              </h3>
              <div className="grid gap-4">
                {PASSION.map((passion, index) => (
                  <motion.div
                    key={passion.title}
                    variants={itemVariant}
                    whileHover={{ x: 4 }}
                    className={`flex items-center space-x-4 p-4 rounded-xl ${
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
                      <passion.icon size={20} className="text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{passion.title}</h4>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-white/90" : "text-gray-700"
                        }`}
                      >
                        {passion.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* digital signature */}
            <motion.div variants={itemVariant} className="text-center py-8">
              <div
                className={`text-sm ${
                  isDarkMode ? "text-white/80" : "text-gray-600"
                } mb-4`}
              >
                Conçu avec passion par
              </div>
              <div className="flex justify-center">
                <img src={SIGNATURE} alt="Evans" className="w-28" />
              </div>
              <div className="text-lg font-medium text-red-500 mt-2">
                Evans Adjé
              </div>
            </motion.div>
          </motion.div>
          {/* developper journey */}
          <motion.div
            ref={timeLineRef}
            initial="hidden"
            animate={timeLineInview ? "visible" : "hidden"}
            variants={timeLineVariant}
            className="relative"
          >
            <h3 className="text-2xl font-medium mb-8 text-center lg:text-left">
               Mon parcours de développeur
            </h3>
            {/* timeline journey */}
            <div
              className={`absolute left-8 top-16 bottom-0 w-px ${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
            <div className="space-y-8">
              {JOURNEY_STEPS.map((step, index) => (
                <motion.div
                  key={`${step.year}-${index}`} // <-- clé unique corrigée
                  variants={stepVariant}
                  whileHover={{ x: 4 }}
                  className="relative flex items-start space-x-6 group"
                >
                  {/* timeline dot */}
                  <div
                    className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration 300 `}
                  >
                    <step.icon size={24} className="text-white" />
                  </div>
                  {/* content */}
                  <div
                    className={`flex-grow p-6 rounded-xl border transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-800/50 border-gray-700 group-hover:border-gray-600 group-hover:bg-gray-800/700"
                        : "bg-white/80 border-gray-200 group-hover:border-gray-300 group-hover:bg-white"
                    }backdrop-blur-sm`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-medium">{step.title}</h4>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {step.year}
                      </span>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-red-400" : "text-red-600"
                      } mb-3`}
                    >
                      {step.company}
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to action*/}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariant}
          className="text-center mt-20 flex flex-col items-center space-y-6"
        >
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Prêt à donner vie à vos idées ?
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex gap-2">
              <motion.a
                href="/cv_Evans.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-l-full flex items-center gap-2 text-sm font-medium transition-all duration-300"
                onClick={() => logCvAction("view")}
              >
                <EyeIcon size={16} /> Voir
              </motion.a>
              <motion.a
                href="/cv_Evans.pdf"
                download
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-r-full flex items-center gap-2 text-sm font-medium transition-all duration-300"
                onClick={() => logCvAction("download")}
              >
                <DownloadIcon size={16} /> Télécharger
              </motion.a>
            </div>

            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-medium transition-all duration-300"
            >
              Travaillons ensemble
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
