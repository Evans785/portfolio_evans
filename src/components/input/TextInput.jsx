import React from "react";

const TextInput = ({
  isDarkMode,
  value,
  handleInputChange,
  textarea,
  label,
}) => {
  const inputComponent = textarea ? "textarea" : "input";

  return (
    <div className="relative">
      {React.createElement(inputComponent, {
        type: textarea ? undefined : "text",
        className: `w-full px-4 pt-6 pb-2 rounded-xl transition-all duration-300 outline-none resize-none ${
          isDarkMode
            ? "bg-gray-800/50 border border-gray-700 text-white focus:border-red-500 focus:bg-gray-800/70"
            : "bg-white/80 border border-gray-300 text-gray-900 focus:border-red-500 focus:bg-white"
        }`,
        value,
        onChange: ({ target }) => handleInputChange(target.value),
      })}
      <label className="text-sm absolute left-4 top-2 pointer-events-none origin-left">
        {label}
      </label>
    </div>
  );
};

export default TextInput;
