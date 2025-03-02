import { useState, useEffect } from "react";
import { MdWbSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";

export default function ModeButton() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg transition bg-gray-200 dark:bg-gray-800 ml-auto"
    >
      {darkMode ? (
        <MdWbSunny className="w-6 h-6 text-yellow-400" />
      ) : (
        <IoMoonSharp className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
}
