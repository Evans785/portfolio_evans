import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Code2, Globe, Zap, Users } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { PROJECTS } from "../../utils/data";

import { containerVariant, itemVariant } from "../../utils/helper";
import ProjectCard from "../ProjectCard";
const ProjectSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  const [filter, setFilter] = useState("Tous");

  const categories = ["Tous", ...new Set(PROJECTS.map((p) => p.category))];

  const filteredProjects =
    filter === "Tous"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      ref={sectionRef}
      id="projets"
      className={`py-24 px-6 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-500"
      } relative overflow-hidden`}
    >
      {/* background element */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-red-500" : "bg-red-400"
          }`}
        />
        <div
          className={`absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-400"
          }`}
        />
      </div>
      <div className="max-w-7xl relative mx-auto z-10">
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
              isDarkMode ? "text-gray-500" : "text-gray-600"
            }mb-4`}
          >
            Projet phare
          </motion.div>
          <motion.h2
            variants={itemVariant}
            className="text-3xl md:text-5xl font-light mb-6"
          >
            Projet
            <span className="text-red-500 font-medium ml-2">Recent</span>
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto font-light`}
          >
            Une collection de projets qui mettent en avant mon expertise dans la
            création d’applications modernes et la résolution de problèmes
            complexes.
          </motion.p>
        </motion.div>
        {/* filtration */}
        <div className="flex gap-4 mb-10 flex-wrap justify-center">
          {categories.map((cat) => (
            <motion.button
              variants={itemVariant}
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ opacity: 1, y: -2 }}
              whileTap={{ scale: 0.98 }}
              key={cat}
              className={`px-4 py-2 rounded-full ${
                filter === cat
                  ? "bg-red-500 text-white"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* project grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariant}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 "
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isDarkMode={isDarkMode}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectSection;
