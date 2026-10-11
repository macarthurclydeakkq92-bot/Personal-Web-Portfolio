import { useEffect, useLayoutEffect, useState } from "react";

export function useMotionPreference() {
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem("scone-motion");
      return ["on", "off", "system"].includes(saved) ? saved : "on";
    } catch {
      return "on";
    }
  });
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const enabled = mode === "on" || (mode === "system" && !systemReduced);
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    try {
      localStorage.setItem("scone-motion", mode);
    } catch {}
  }, [mode, enabled]);
  return { mode, setMode, enabled };
}
