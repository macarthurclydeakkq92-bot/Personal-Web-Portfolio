import { useEffect } from "react";

// Pointer-driven transforms stay outside React rendering and never change layout.
export function useGlassTilt(enabled = true) {
  useEffect(() => {
    const pointer = window.matchMedia(
      "(any-hover: hover) and (any-pointer: fine)",
    );
    const elements = [
      ...document.querySelectorAll(
        ".project, .skill, .operator, .index-project, .field-nav > a, .contact-pill, .index-all, .language",
      ),
    ].filter((element) => !element.classList.contains("magic-bento-card"));
    elements.forEach((element) => element.classList.add("glass-tilt"));
    if (!enabled) return;
    const resets = [];
    const cleanups = elements.map((element) => {
      element.classList.add("glass-tilt");
      let frame = 0;
      let bounds;
      let position;
      const reset = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        bounds = null;
        element.classList.remove("is-hovered");
        for (const property of ["--tilt-x", "--tilt-y", "--glow-x", "--glow-y"])
          element.style.removeProperty(property);
      };
      resets.push(reset);
      const move = (event) => {
        if (event.pointerType !== "mouse" || !pointer.matches) return;
        bounds ??= element.getBoundingClientRect();
        element.classList.add("is-hovered");
        position = { x: event.clientX, y: event.clientY };
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          const x = Math.max(
            0,
            Math.min(1, (position.x - bounds.left) / bounds.width),
          );
          const y = Math.max(
            0,
            Math.min(1, (position.y - bounds.top) / bounds.height),
          );
          const angle = element.matches(".language, .contact-pill") ? 0.8 : 1.6;
          element.style.setProperty(
            "--tilt-x",
            `${((0.5 - y) * angle * 2).toFixed(2)}deg`,
          );
          element.style.setProperty(
            "--tilt-y",
            `${((x - 0.5) * angle * 2).toFixed(2)}deg`,
          );
          element.style.setProperty("--glow-x", `${(x * 100).toFixed(1)}%`);
          element.style.setProperty("--glow-y", `${(y * 100).toFixed(1)}%`);
        });
      };
      element.addEventListener("pointerenter", move);
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
      element.addEventListener("pointercancel", reset);
      element.addEventListener("blur", reset, true);
      return () => {
        reset();
        element.removeEventListener("pointerenter", move);
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
        element.removeEventListener("pointercancel", reset);
        element.removeEventListener("blur", reset, true);
      };
    });
    const resetAll = () => resets.forEach((reset) => reset());

    pointer.addEventListener("change", resetAll);
    window.addEventListener("blur", resetAll);
    window.addEventListener("scroll", resetAll, { passive: true });
    window.addEventListener("resize", resetAll);
    return () => {
      cleanups.forEach((cleanup) => cleanup());

      pointer.removeEventListener("change", resetAll);
      window.removeEventListener("blur", resetAll);
      window.removeEventListener("scroll", resetAll);
      window.removeEventListener("resize", resetAll);
    };
  }, [enabled]);
}
