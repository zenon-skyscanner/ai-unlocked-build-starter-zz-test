import { useState, useEffect } from "react";

const STORAGE_KEY = "skybound-london-theme";

export default function ThemeToggle() {
  const [isLondon, setIsLondon] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "true") {
      setIsLondon(true);
      document.documentElement.classList.add("london-theme");
    }
  }, []);

  const toggle = () => {
    const next = !isLondon;
    setIsLondon(next);
    if (next) {
      document.documentElement.classList.add("london-theme");
    } else {
      document.documentElement.classList.remove("london-theme");
    }
    localStorage.setItem(STORAGE_KEY, String(next));
    window.dispatchEvent(new CustomEvent("theme-change", { detail: { isLondon: next } }));
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1 text-xs font-medium text-white transition-all hover:bg-white/20"
      title={isLondon ? "Switch to default theme" : "Switch to London theme"}
    >
      <span className="text-sm">{isLondon ? "🚇" : "🇬🇧"}</span>
      <span>{isLondon ? "London Style ON" : "London Style"}</span>
    </button>
  );
}
