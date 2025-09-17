import React from "react";
import { motion } from "framer-motion";

const Switch = ({ enabled, setEnabled }) => {
  return (
    <div
      onClick={() => setEnabled(!enabled)}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        enabled ? "bg-red-500" : "bg-gray-300"
      }`}
    >
      <motion.div layout className="bg-white w-4 h-4 rounded-full shadow-md" />
    </div>
  );
};

export default Switch;
