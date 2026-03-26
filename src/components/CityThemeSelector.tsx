import { useState, useEffect, useRef } from "react";
import { CITY_THEMES, STORAGE_KEY, getThemeById } from "../data/cityThemes";

export default function CityThemeSelector() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved !== "none") {
      setActiveId(saved);
      const theme = getThemeById(saved);
      if (theme) document.documentElement.classList.add(theme.cssClass);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectCity = (id: string | null) => {
    // Remove previous theme class
    CITY_THEMES.forEach((t) =>
      document.documentElement.classList.remove(t.cssClass)
    );

    if (id) {
      const theme = getThemeById(id);
      if (theme) document.documentElement.classList.add(theme.cssClass);
    }

    setActiveId(id);
    localStorage.setItem(STORAGE_KEY, id ?? "none");
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: { cityId: id } })
    );
    setOpen(false);
  };

  const active = activeId ? getThemeById(activeId) : null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1 text-xs font-medium text-white transition-all hover:bg-white/20"
        title="Select your city style"
      >
        <span className="text-sm">{active ? active.activeIcon : "🌍"}</span>
        <span>{active ? `${active.name} Style` : "City Style"}</span>
        <span className="ml-0.5 text-[10px]">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-lg border border-white/10 bg-gray-900 py-1 shadow-xl">
          {/* Default option */}
          <button
            onClick={() => selectCity(null)}
            className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-white/10 ${
              !activeId ? "text-white font-bold" : "text-gray-300"
            }`}
          >
            <span>🌍</span>
            <span>Default</span>
            {!activeId && <span className="ml-auto text-xs">✓</span>}
          </button>

          <div className="mx-3 my-1 border-t border-white/10" />

          {/* City options */}
          {CITY_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => selectCity(theme.id)}
              className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-white/10 ${
                activeId === theme.id ? "text-white font-bold" : "text-gray-300"
              }`}
            >
              <span>{theme.flag}</span>
              <span>{theme.name}</span>
              {activeId === theme.id && (
                <span className="ml-auto text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
