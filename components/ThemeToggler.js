import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import IconMoon from "../public/images/IconMoon.svg";
import IconSun from "../public/images/IconSun.svg";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? <IconMoon /> : <IconSun />}
    </button>
  );
};

export default ThemeToggler;
