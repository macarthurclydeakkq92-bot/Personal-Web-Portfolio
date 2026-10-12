import { useLayoutEffect } from "react";
import { gsap } from "gsap";

// Nested rotor layers let the opening animate the outer rings independently.
export function useOrbitMotion(enabled) {
  useLayoutEffect(() => {
    if (!enabled) return;
    const hero = document.querySelector(".hud-hero");
    let inView = true;
    const loops = [];
    const context = gsap.context(() => {
      loops.push(
        gsap.to(".orbit-outer .orbit-rotor", {
          rotation: 360,
          duration: 38,
          repeat: -1,
          ease: "none",
        }),
      );
      loops.push(
        gsap.to(".orbit-inner .orbit-rotor", {
          rotation: -360,
          duration: 54,
          repeat: -1,
          ease: "none",
        }),
      );
      loops.push(
        gsap.to(".radar-ticks", {
          rotation: -360,
          duration: 100,
          repeat: -1,
          ease: "none",
        }),
      );
      loops.push(
        gsap.to(".radar-sweep", {
          rotation: 360,
          duration: 16,
          repeat: -1,
          ease: "none",
        }),
      );
    }, hero);
    const update = () =>
      loops.forEach((loop) => loop.paused(!inView || document.hidden));
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(hero);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      context.revert();
    };
  }, [enabled]);
}
