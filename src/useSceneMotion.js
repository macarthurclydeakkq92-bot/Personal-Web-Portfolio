import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSceneMotion(language, enabled) {
  const opened = useRef(false);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 0px)", () => {
      if (!enabled) return;
      const context = gsap.context(() => {
        document.documentElement.classList.add("scene-motion-enabled");
        const hero = document.querySelector(".hud-hero");
        const curtain = document.querySelector(".opening-curtain");
        const lines = hero.querySelectorAll(".motion-word");
        const entrances = [];
        const revealCard = (card, timeline, at = 0, distance = 85) => {
          // Entrance moves an outer frame; MagicBento owns the inner card transform.
          card = card.closest(".scene-card-slot") || card;
          card.classList.add("scene-card");
          gsap.set(card, {
            y: card.matches(".operator") ? 0 : distance,
            clipPath: "inset(12% 0% 100% 0%)",
          });
          timeline.to(
            card,
            {
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.65,
              ease: "power4.inOut",
              onComplete: () =>
                gsap.set(card, {
                  clearProps: card.matches(".operator")
                    ? "clipPath"
                    : "clipPath,transform",
                }),
            },
            at,
          );
        };
        let opening;
        // Fresh landings start on the actual opening, even if Chrome restores old scroll.
        if (!opened.current && !window.location.hash) {
          window.history.scrollRestoration = "manual";
          window.scrollTo({ top: 0, behavior: "instant" });
        }
        const startAtTop = !window.location.hash;
        if (!opened.current && startAtTop) {
          opened.current = true;
          gsap.set(curtain, {
            display: "flex",
            clipPath: "inset(0% 0% 0% 0%)",
          });
          gsap.set(lines, {
            yPercent: 135,
            x: -65,
            scaleX: 0.76,
            skewX: -8,
            transformOrigin: "0% 50%",
          });
          opening = gsap.timeline({
            defaults: { ease: "power4.inOut" },
            onComplete: () => {
              gsap.set(curtain, { display: "none" });
              hero.dataset.opening = "complete";
            },
          });
          opening
            .fromTo(
              ".opening-name",
              { yPercent: 120, scaleX: 0.75 },
              { yPercent: 0, scaleX: 1, duration: 1.25 },
              0,
            )
            .fromTo(
              ".opening-rule",
              { scaleX: 0 },
              { scaleX: 1, duration: 1.3, transformOrigin: "left" },
              0.2,
            )
            .to(".opening-name", { yPercent: -130, duration: 1.1 }, 1.1)
            .to(
              curtain,
              { clipPath: "inset(0% 0% 100% 0%)", duration: 1.55 },
              1.05,
            )
            .fromTo(
              ".radar-landscape",
              { clipPath: "inset(0% 100% 0% 0%)", scale: 1.15 },
              { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 2.2 },
              1.25,
            )
            .fromTo(
              ".radar-orbit",
              { rotation: -45, scale: 0.83 },
              { rotation: 0, scale: 1, duration: 2.65, stagger: 0.15 },
              1.2,
            )
            .to(
              lines,
              {
                yPercent: 0,
                x: 0,
                scaleX: 1,
                skewX: 0,
                duration: 1.9,
                stagger: 0.23,
                ease: "expo.out",
              },
              1.65,
            )
            .fromTo(
              ".hud-nav",
              { y: -38, clipPath: "inset(0% 0% 100% 0%)" },
              {
                y: 0,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.5,
                clearProps: "transform,clipPath",
              },
              1.85,
            )
            .fromTo(
              ".hero-content > .eyebrow, .hero-index, .hero-intro",
              { y: 38, clipPath: "inset(0% 0% 100% 0%)" },
              {
                y: 0,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.3,
                stagger: 0.14,
                clearProps: "transform,clipPath",
              },
              2.1,
            )
            .fromTo(
              ".field-nav",
              { y: 40, clipPath: "inset(0% 0% 100% 0%)" },
              {
                y: 0,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.5,
                clearProps: "transform,clipPath",
              },
              2.4,
            );
          revealCard(document.querySelector(".operator"), opening, 2.6, 35);
          document
            .querySelectorAll(".index-project")
            .forEach((card, i) =>
              revealCard(card, opening, 2.5 + i * 0.18, 40),
            );
          opening.fromTo(
            ".panel-heading, .index-all, .hero-foot",
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              stagger: 0.15,
              clearProps: "clipPath",
            },
            3,
          );
        } else {
          opened.current = true;
          gsap.set(lines, { clearProps: "transform,clipPath" });
          hero.dataset.opening = "complete";
        }

        document.querySelectorAll("main > .section").forEach((section) => {
          const heading = section.querySelector(".motion-heading");
          if (!heading) return;
          const sectionLines = heading.querySelectorAll(".motion-word");
          const titleTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: heading,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
          entrances.push({ anchor: heading, timeline: titleTimeline });
          titleTimeline.fromTo(
            sectionLines,
            {
              yPercent: 125,
              x: -95,
              scaleX: 0.82,
              skewX: -7,
              transformOrigin: "0% 50%",
            },
            {
              yPercent: 0,
              x: 0,
              scaleX: 1,
              skewX: 0,
              duration: 1.9,
              stagger: 0.2,
              ease: "expo.out",
            },
          );
          const label = section.querySelector(".section-label, .eyebrow");
          if (label)
            titleTimeline.fromTo(
              label,
              { clipPath: "inset(0% 100% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.35,
                ease: "power3.inOut",
                clearProps: "clipPath",
              },
              0.25,
            );
          const cards = section.querySelectorAll(".project, .skill, .photography-card");
          cards.forEach((card, i) => {
            // Each row has its own viewport trigger; later work is never revealed far offscreen.
            const grid =
              card.closest(".scene-card-slot")?.parentElement ||
              card.parentElement;
            const columns =
              getComputedStyle(grid).gridTemplateColumns.split(" ").length;
            const staggerIndex = card.matches(".project-0")
              ? 0
              : i % Math.max(1, columns);
            const cardTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 91%",
                toggleActions: "play none none none",
              },
            });
            entrances.push({
              anchor: card.closest(".scene-card-slot") || card,
              timeline: cardTimeline,
            });
            revealCard(card, cardTimeline, 0.3 + staggerIndex * 0.22);
            const image = card.querySelector(".project-image");
            if (image)
              cardTimeline.fromTo(
                image,
                { clipPath: "inset(0% 100% 0% 0%)" },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 1.8,
                  ease: "power3.inOut",
                  clearProps: "clipPath",
                },
                0.5 + staggerIndex * 0.22,
              );
          });
          const portrait = section.querySelector(".portrait");
          if (portrait) {
            const portraitTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: portrait,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
            entrances.push({ anchor: portrait, timeline: portraitTimeline });
            revealCard(portrait, portraitTimeline, 0.35, 65);
          }
        });

        if (
          window.matchMedia("(min-width: 801px) and (pointer: fine)").matches
        ) {
          document.querySelectorAll(".project-image").forEach((image) => {
            gsap.fromTo(
              image,
              { yPercent: -4, scale: 1.1 },
              {
                yPercent: 4,
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                  trigger: image.closest(".project-art"),
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.6,
                },
              },
            );
          });
        }
        // Fast navigation must show content, rather than queue masks offscreen.
        let scrollFrame = 0;
        let previousScroll = window.scrollY;
        let previousTime = performance.now();
        const settlePassedEntrances = (jumped = false) => {
          const atBottom =
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 8;
          entrances.forEach(({ anchor, timeline }) => {
            if (timeline.progress() >= 1) return;
            const bounds = anchor.getBoundingClientRect();
            if (
              bounds.bottom <= 0 ||
              ((jumped || atBottom) && bounds.top < window.innerHeight)
            ) {
              timeline.progress(1);
            }
          });
        };
        const handleScroll = () => {
          // A timeline at time zero is not yet "active", but must still be dismissible.
          if (opening && opening.progress() < 1 && window.scrollY > 80)
            opening.progress(1);
          if (scrollFrame) return;
          scrollFrame = requestAnimationFrame(() => {
            scrollFrame = 0;
            const now = performance.now();
            const delta = Math.abs(window.scrollY - previousScroll);
            const speed = (delta / Math.max(16, now - previousTime)) * 1000;
            settlePassedEntrances(
              delta > window.innerHeight * 0.6 || speed > 2400,
            );
            previousScroll = window.scrollY;
            previousTime = now;
          });
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        const refreshFrame = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          settlePassedEntrances();
        });
        return () => {
          window.removeEventListener("scroll", handleScroll);
          cancelAnimationFrame(scrollFrame);
          cancelAnimationFrame(refreshFrame);
        };
      });
      return () => {
        context.revert();
        document.documentElement.classList.remove("scene-motion-enabled");
        document
          .querySelectorAll(".scene-card")
          .forEach((card) => card.classList.remove("scene-card"));
      };
    });
    return () => media.revert();
  }, [language, enabled]);
}
