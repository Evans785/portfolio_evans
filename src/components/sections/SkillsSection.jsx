import { useRef } from "react";
import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { SKILLS_CATEGORY, STATS, TECH_STACK } from "../../utils/data";
import { containerVariant, itemVariant } from "../../utils/helper";

const SkillsSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const skillsBarVariant = {
    hidden: { width: 0, opacity: 0 },
    visible: (level) => ({
      width: `${level}%`,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="competences"
      className={`py-24 px-4 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-500"
      } relative overflow-hidden`}
    >
      {/* background element */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-40 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-red-500" : "bg-red-400"
          }`}
        />
        <div
          className={`absolute bottom-42 left-3/4 w-64 h-64 rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-400"
          }`}
        />
      </motion.div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* section header*/}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariant}
          className="text-center mb-28"
        >
          <motion.div
            variants={itemVariant}
            className={`text-sm uppercase tracking-widest ${
              isDarkMode ? "text-gray-500" : "text-gray-600"
            }mb-4`}
          >
            Expertise technique
          </motion.div>
          <motion.h2
            variants={itemVariant}
            className="text-3xl md:text-3xl font-light mb-6"
          >
            Compétences &
            <span className="text-red-500 font-medium">Technologies</span>
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto font-light`}
          >
            Compétences techniques couvrant tous les aspects du développement
            web, du design à la gestion des données
          </motion.p>
        </motion.div>

        {/* skills grid*/}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariant}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {SKILLS_CATEGORY.map((category, categoryIndex) => (
            <motion.div
              key={category.little}
              variants={itemVariant}
              className={`p-8 rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-900/50 border-gray-800 backdrop-blur-sm"
                  : "bg-white/80 border-gray-200 backdrop-blur-sm"
              }`}
            >
              {/* category header*/}
              <div className="flex items-center mb-6">
                <div
                  className={`p-3 rounded-xl ${
                    isDarkMode ? "bg-gray-300" : "bg-gray-100"
                  }mr-4`}
                >
                  <category.icon size={24} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">
                    {category.title}{" "}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {category.description}
                  </p>
                </div>
              </div>
              {/* skylls part*/}
              <div className="space-y-4">
                {category.skills.map((skills, skillIndex) => (
                  <div className="group" key={skills.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        {skills.name}{" "}
                      </span>
                      <span
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {skills.level}%
                      </span>
                    </div>
                    <div
                      className={`h-2 rounded-full overflow-hidden ${
                        isDarkMode ? "bg-gray-800" : "bg-gray-200"
                      }`}
                    >
                      <motion.div
                        variants={skillsBarVariant}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        custom={skills.level}
                        className={`h-full ${skills.color} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* additionnal skilss*/}
        <motion.div
          initial="hidden"
          variants={containerVariant}
          animate={isInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <motion.div variants={itemVariant} className="text-center mb-8">
            <h3 className="text-xl font-medium mb-4">
              Je travaille aussi avec
            </h3>
          </motion.div>
          <motion.div
            variants={itemVariant}
            className="flex flex-wrap justify-center gap-3"
          >
            {TECH_STACK.map((tech, index) => (
              <motion.span
                key={tech}
                whileHover={{ y: -2, scale: 1.05 }}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-600"
                    : "bg-white border-gray-300 text-gray-700 hover-border-gray-400"
                }`}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
        {/* stats*/}
        <motion.div
          initial="hidden"
          variants={containerVariant}
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariant}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-light text-red-500 mb-2">
                {stat.number}
              </div>
              <div
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
