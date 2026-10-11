import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { heroVideo } from "./site.js";
import projectArchive from "./projects.json";
import { useGlassTilt } from "./useGlassTilt.js";
import MagicBento from "./MagicBento.jsx";
import { useSceneMotion } from "./useSceneMotion.js";
import { useMotionPreference } from "./useMotionPreference.js";
const magicEffects = {
  textAutoHide: true,
  enableStars: true,
  enableSpotlight: true,
  enableBorderGlow: true,
  enableTilt: true,
  enableMagnetism: true,
  clickEffect: true,
  spotlightRadius: 700,
  particleCount: 12,
  glowColor: "220, 231, 147",
};
const copy = {
  en: {
    nav: ["About", "Selected work", "Approach"],
    contact: "Let’s talk",
    role: "GAME VFX / VISUAL DESIGN / INTERACTION",
    title: ["Imagined worlds,", "brought to life."],
    intro:
      "Kangcheng Yuan — creating game effects, visual worlds and interactive experiences.",
    explore: "Explore selected work",
    scroll: "SCROLL TO EXPLORE",
    about: "A little about me",
    aboutTitle: "Between imagination\nand experience.",
    bio: "I’m Kangcheng Yuan, a Game and Interactive Media Design student at Rensselaer Polytechnic Institute. From a VFX internship at Black Jack Studio (Zilong Game) to independent Unity and Unreal projects, I create real-time effects, environments and interactions that bring game worlds to life.",
    note: "Unity Particle System · Unreal Niagara · Maya · ZBrush · Substance Painter · Houdini",
    stats: [
      "Conduit Steam wishlists",
      "Two Sisters playtesters",
      "Wands and Tomes cards",
    ],
    work: "Selected explorations",
    workTitle: "A feeling. A world.\nA moment that stays.",
    workNote:
      "Selected game worlds, real-time effects and interactive studies.",
    approach: "What I bring",
    approachTitle: "Ideas with atmosphere.\nDetails with intent.",
    skills: [
      [
        "01",
        "Motion with meaning",
        "Unity particles and Unreal Niagara effects for attacks, abilities and environmental feedback.",
        "GAME VFX",
      ],
      [
        "02",
        "A coherent visual world",
        "Maya and ZBrush environments, Substance Painter PBR materials and a cohesive sense of art direction.",
        "VISUAL DESIGN",
      ],
      [
        "03",
        "Interaction with feeling",
        "Game mechanics, balance and player feedback refined through hands-on playtesting.",
        "INTERACTION",
      ],
    ],
    end: "HAVE SOMETHING IN MIND?",
    endTitle: ["Let’s make", "something felt."],
    endText:
      "Open to conversations about game worlds, visual identities and interactive experiences.",
    pending: "Contact details coming soon",
    top: "Back to top",
    copyright: "Independent portfolio / Work in progress",
    preview: "PROJECT PREVIEW",
    close: "Close",
    detail:
      "Project description is based on my résumé. The artwork shown here is a placeholder; original screenshots, footage and process breakdowns will be added.",
    video:
      "Video background slot — cinematic artwork shown until footage is supplied.",
  },
  zh: {
    nav: ["关于我", "精选作品", "创作优势"],
    contact: "联系我",
    role: "游戏特效 / 视觉设计 / 交互设计",
    title: ["构筑想象，", "赋予世界生命。"],
    intro: "袁康成 — 以游戏特效、视觉设计与交互，构建富有感知的世界。",
    explore: "探索精选作品",
    scroll: "向下探索",
    about: "关于我",
    aboutTitle: "在想象与体验\n之间创作。",
    bio: "我是袁康成，就读于伦斯勒理工学院游戏与交互媒体设计专业。从紫龙游戏 Black Jack Studio 的特效实习，到 Unity 与 Unreal 团队项目，我通过实时特效、场景美术和交互设计，让游戏世界鲜活起来。",
    note: "Unity 粒子系统 · Unreal Niagara · Maya · ZBrush · Substance Painter · Houdini",
    stats: [
      "Conduit Steam 愿望单",
      "Two Sisters 测试玩家",
      "Wands and Tomes 卡牌",
    ],
    work: "精选探索",
    workTitle: "一种感受，一个世界。\n一个值得停留的瞬间。",
    workNote: "游戏世界、实时特效与交互探索。",
    approach: "创作优势",
    approachTitle: "让想法拥有氛围，\n让细节带着意图。",
    skills: [
      [
        "01",
        "有意义的动态",
        "使用 Unity 粒子系统与 Unreal Niagara，塑造攻击、技能和环境反馈。",
        "游戏特效",
      ],
      [
        "02",
        "统一的视觉世界",
        "结合 Maya、ZBrush 场景制作与 Substance Painter PBR 材质，构建统一视觉语言。",
        "视觉设计",
      ],
      [
        "03",
        "有温度的交互",
        "从玩法机制与数值设计出发，通过玩家测试不断打磨交互反馈与体验。",
        "交互设计",
      ],
    ],
    end: "有一个想法，想一起实现？",
    endTitle: ["一起创造，", "能被感受到的作品。"],
    endText: "期待关于游戏世界、视觉语言与交互体验的交流。",
    pending: "联系方式待补充",
    top: "回到顶部",
    copyright: "个人作品集 / 持续完善中",
    preview: "项目预览",
    close: "关闭",
    detail:
      "项目介绍依据个人简历整理。当前画面为视觉占位，后续加入真实截图、视频与创作过程。",
    video: "视频背景预留：提供视频前展示电影感视觉画面。",
  },
};
function Art({ variant = "one" }) {
  return (
    <div className={`art art-${variant}`} aria-hidden="true">
      <div className="orb" />
      <div className="ring ring-a" />
      <div className="ring ring-b" />
      <div className="beam" />
      <div className="grain" />
    </div>
  );
}
function Icon({ kind }) {
  const paths = {
    work: (
      <>
        <rect x="4" y="4" width="6" height="6" />
        <rect x="14" y="4" width="6" height="6" />
        <rect x="4" y="14" width="6" height="6" />
        <rect x="14" y="14" width="6" height="6" />
      </>
    ),
    about: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M5 21v-3a7 7 0 0 1 14 0v3" />
      </>
    ),
    approach: (
      <>
        <path d="m12 3 9 9-9 9-9-9zM12 7v10M7 12h10" />
      </>
    ),
    arrow: <path d="M5 19 19 5M5 5h14v14" />,
  };
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {paths[kind] || paths.arrow}
    </svg>
  );
}
function MotionHeading({ as: Tag = "h2", lines, accent = false }) {
  const text = Array.isArray(lines) ? lines : lines.split("\n");
  return (
    <Tag className="motion-heading" aria-label={text.join(" ")}>
      {text.map((line, i) => (
        <span className="motion-line" key={i}>
          <span
            className={`motion-word ${accent && i === text.length - 1 ? "title-accent" : ""}`}
            aria-hidden="true"
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
function App() {
  const motion = useMotionPreference();
  useGlassTilt(motion.enabled);
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("scone-language") === "zh" ? "zh" : "en";
    } catch {
      return "en";
    }
  });
  useSceneMotion(lang, motion.enabled);
  const [active, setActive] = useState(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const t = copy[lang];
  const projects = projectArchive.map((p) =>
    lang === "zh" ? { ...p, ...p.zh } : p,
  );
  const selected = active === null ? null : projects[active];
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    try {
      localStorage.setItem("scone-language", lang);
    } catch {}
  }, [lang]);
  useEffect(() => {
    if (active === null) return;
    const previous = document.activeElement;
    document.body.style.overflow = "hidden";
    const dialog = document.getElementById("project-dialog");
    dialog.showModal();
    const dismiss = () => setActive(null);
    dialog.addEventListener("cancel", dismiss);
    return () => {
      dialog.removeEventListener("cancel", dismiss);
      dialog.close();
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [active]);
  return (
    <>
      <div className="opening-curtain" aria-hidden="true">
        <div className="opening-lockup">
          <span className="opening-kicker">SCONE STUDIO / VISUAL PRACTICE</span>
          <div className="opening-mask">
            <span className="opening-name">
              scone<span>®</span>
            </span>
          </div>
          <span className="opening-rule" />
          <span className="opening-meta">
            GAME VFX · VISUAL DESIGN · INTERACTION
          </span>
        </div>
      </div>
      <a className="skip" href="#about">
        {lang === "en" ? "Skip to content" : "跳转至内容"}
      </a>
      <header className="nav hud-nav">
        <a className="brand" href="#home" aria-label="SCONE home">
          scone<span>®</span>
        </a>
        <span className="nav-caption">INDEPENDENT CREATIVE / 袁康成</span>
        <div className="nav-actions">
          <select
            className="motion-control"
            value={motion.mode}
            onChange={(e) => motion.setMode(e.target.value)}
            aria-label={lang === "en" ? "Motion preference" : "动效设置"}
            title={
              lang === "en"
                ? "On: full motion / Auto: follow system / Off: static"
                : "开启：完整动效 / 自动：跟随系统 / 关闭：静态"
            }
          >
            <option value="on">FX ON</option>
            <option value="system">FX AUTO</option>
            <option value="off">FX OFF</option>
          </select>
          <div className="language" aria-label="Language">
            <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              EN
            </button>
            <span>/</span>
            <button aria-pressed={lang === "zh"} onClick={() => setLang("zh")}>
              中文
            </button>
          </div>
          <a className="contact-pill" href="#contact">
            {t.contact}
            <Icon />
          </a>
        </div>
      </header>
      <main>
        <section className="hero hud-hero" id="home">
          <div className="hud-grid" aria-hidden="true" />
          <div className="radar" aria-hidden="true">
            <div className="radar-orbit orbit-outer" />
            <div className="radar-orbit orbit-inner" />
            <div className="radar-landscape">
              <img src="/assets/conduit-01.webp" alt="" />
              <div className="radar-contours" />
            </div>
            <span className="radar-cross cross-one">+</span>
            <span className="radar-cross cross-two">+</span>
            <span className="radar-marker" />
            <span className="radar-label">SCONE / CREATIVE FIELD</span>
          </div>
          {heroVideo && !videoFailed && (
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label={t.video}
              onError={() => setVideoFailed(true)}
            >
              <source
                src={heroVideo}
                type="video/mp4"
                onError={() => setVideoFailed(true)}
              />
            </video>
          )}
          <div className="hero-shade" />
          <div className="hud-stage wrap">
            <div className="hero-content">
              <div className="eyebrow">
                <span className="dot" />
                {t.role}
              </div>
              <div className="hero-index">
                PORTFOLIO / VOL. 01 <span>2026</span>
              </div>
              <MotionHeading as="h1" lines={t.title} accent />
              <p className="hero-intro">{t.intro}</p>
              <nav
                className="field-nav"
                aria-label={lang === "en" ? "Main navigation" : "主导航"}
              >
                {[1, 0, 2].map((i) => (
                  <a
                    href={["#about", "#work", "#approach"][i]}
                    key={i}
                    className={i === 1 ? "field-primary" : ""}
                  >
                    <span className="field-number">0{i + 1}</span>
                    <Icon kind={["about", "work", "approach"][i]} />
                    <span>{t.nav[i]}</span>
                    <Icon />
                  </a>
                ))}
              </nav>
              <div className="operator">
                <span className="operator-mark">S /</span>
                <div>
                  <strong>KANGCHENG YUAN</strong>
                  <span>
                    {lang === "en"
                      ? "Game VFX · Visual · Interaction"
                      : "游戏特效 · 视觉 · 交互"}
                  </span>
                </div>
                <span className="operator-code">SC—01</span>
              </div>
            </div>
            <aside
              className="hero-projects"
              aria-label={lang === "en" ? "Project shortcuts" : "项目快捷入口"}
            >
              <div className="panel-heading">
                <span className="dot" />
                {lang === "en" ? "PROJECT INDEX" : "项目索引"}
                <span>01—05</span>
              </div>
              <MagicBento
                {...magicEffects}
                disableAnimations={!motion.enabled}
                className="index-cards"
              >
                {[0, 1, 4].map((i) => (
                  <button
                    className="index-project"
                    key={i}
                    onClick={() => setActive(i)}
                  >
                    <span className="index-number">0{i + 1}</span>
                    {projects[i].cover ? (
                      <img src={projects[i].cover} alt="" />
                    ) : (
                      <span className="index-prototype">
                        <Icon kind="approach" />
                      </span>
                    )}
                    <span className="index-title">
                      <strong>{projects[i].title}</strong>
                      <small>{projects[i].category}</small>
                    </span>
                    <Icon />
                  </button>
                ))}
              </MagicBento>
              <a className="index-all" href="#work">
                {t.explore}
                <Icon />
              </a>
            </aside>
          </div>
          <div className="hero-foot wrap">
            <span>{t.scroll} ↓</span>
            <span className="hero-credit">
              {lang === "en"
                ? "BACKGROUND / CONDUIT · TEAM GAMEPLAY"
                : "背景 / CONDUIT · 团队游戏画面"}
            </span>
            <span className="coordinate">光 / MOTION / 感覚</span>
          </div>
        </section>
        <section className="about wrap section" id="about">
          <div className="section-label">
            <span>01 /</span>
            {t.about}
          </div>
          <div className="about-grid">
            <div className="portrait">
              <Art variant="portrait" />
              <div className="portrait-label">
                SCONE
                <br />
                <span>CREATIVE PRACTICE</span>
              </div>
              <span className="portrait-note">PORTRAIT PLACEHOLDER</span>
            </div>
            <div className="about-copy">
              <MotionHeading lines={t.aboutTitle} />
              <p className="body-copy">{t.bio}</p>
              <p className="placeholder-note">{t.note}</p>
              <a className="text-link" href="#contact">
                {t.contact}
                <Icon />
              </a>
              <div className="experience">
                <div>
                  <span>2023 — 2027</span>
                  <strong>Rensselaer Polytechnic Institute</strong>
                  <p>
                    {lang === "en"
                      ? "Game and Interactive Media Design"
                      : "游戏与交互媒体设计"}
                  </p>
                </div>
                <div>
                  <span>07 — 08 / 2025</span>
                  <strong>Black Jack Studio · Zilong Game</strong>
                  <p>
                    {lang === "en"
                      ? "VFX Artist Intern · Unity strategy RPG"
                      : "特效美术实习 · Unity 策略 RPG"}
                  </p>
                </div>
                <div>
                  <span>03 / 2026</span>
                  <strong>GDC 2026</strong>
                  <p>
                    {lang === "en"
                      ? "Exhibitor & Presenter · Wands and Tomes"
                      : "参展与展示 · Wands and Tomes"}
                  </p>
                </div>
              </div>
              <div className="stats">
                {["2,000+", "70+", "100+"].map((s, i) => (
                  <div key={i}>
                    <strong>{s}</strong>
                    <span>{t.stats[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="work section wrap" id="work">
          <div className="section-label">
            <span>02 /</span>
            {t.work}
          </div>
          <div className="section-heading">
            <MotionHeading lines={t.workTitle} />
            <p className="placeholder-note">{t.workNote}</p>
          </div>
          <MagicBento
            {...magicEffects}
            disableAnimations={!motion.enabled}
            className="project-grid"
          >
            {projects.map((p, i) => (
              <button
                className={`project project-${i}`}
                key={p.slug}
                onClick={() => setActive(i)}
                aria-label={`${lang === "en" ? "View" : "查看"} ${p.title}`}
              >
                <div className="project-art">
                  {p.cover ? (
                    <img
                      className="project-image"
                      src={p.cover}
                      alt={p.coverCaption}
                      loading="lazy"
                      width="1600"
                      height="900"
                    />
                  ) : (
                    <>
                      <Art variant="one" />
                      <div className="art-word">AFTERLIGHT / 余光</div>
                    </>
                  )}
                  <span className="project-number">
                    0{i + 1} /{" "}
                    {i === 4
                      ? lang === "en"
                        ? "PAUSED PROTOTYPE"
                        : "已暂停的原型"
                      : p.category.toUpperCase()}
                  </span>
                  <span className="project-open">
                    <Icon />
                  </span>
                  {!p.cover && (
                    <span className="prototype-note">
                      {lang === "en"
                        ? "CURRENT UNITY VISUALS PENDING"
                        : "当前 Unity 画面待补充"}
                    </span>
                  )}
                </div>
                <div className="project-meta">
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.category}</p>
                  </div>
                  <span>{p.period || "—"}</span>
                </div>
                <p className="project-summary">{p.summary}</p>
              </button>
            ))}
          </MagicBento>
        </section>
        <section className="approach section" id="approach">
          <div className="wrap">
            <div className="section-label">
              <span>03 /</span>
              {t.approach}
            </div>
            <MotionHeading lines={t.approachTitle} />
            <MagicBento
              {...magicEffects}
              disableAnimations={!motion.enabled}
              className="skill-grid"
            >
              {t.skills.map((s, i) => (
                <article className="skill" key={i}>
                  <div className="skill-top">
                    <span>{s[0]}</span>
                    <span className="skill-icon">{["✳", "◈", "⌘"][i]}</span>
                  </div>
                  <h3>{s[1]}</h3>
                  <p>{s[2]}</p>
                  <span className="skill-tag">{s[3]}</span>
                </article>
              ))}
            </MagicBento>
          </div>
        </section>
        <section className="contact section" id="contact">
          <div className="contact-glow" />
          <div className="wrap contact-inner">
            <div className="eyebrow">
              <span className="dot" />
              {t.end}
            </div>
            <MotionHeading lines={t.endTitle} accent />
            <p>{t.endText}</p>
            <a className="pending-contact" href="mailto:yuanscone@gmail.com">
              yuanscone@gmail.com
              <Icon />
            </a>
            <footer>
              <a className="brand" href="#home">
                scone<span>®</span>
              </a>
              <span>© 2026 SCONE · {t.copyright}</span>
              <a href="#home">{t.top} ↑</a>
            </footer>
          </div>
        </section>
      </main>
      <dialog
        id="project-dialog"
        aria-labelledby="dialog-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
      >
        {selected && (
          <div className="dialog-content">
            <button
              className="dialog-close"
              autoFocus
              onClick={() => setActive(null)}
            >
              {t.close} ×
            </button>
            <span className="eyebrow">
              {lang === "en" ? "PROJECT / CASE STUDY" : "项目 / 创作记录"}
            </span>
            <h2 id="dialog-title">{selected.title}</h2>
            <p className="case-summary">{selected.summary}</p>
            {selected.cover && (
              <figure className="case-cover">
                <img src={selected.cover} alt={selected.coverCaption} />
                <figcaption>{selected.coverCaption}</figcaption>
              </figure>
            )}
            <dl className="case-facts">
              {[
                [lang === "en" ? "ROLE" : "个人职责", selected.role],
                [lang === "en" ? "TOOLS" : "工具", selected.tools],
                [lang === "en" ? "PERIOD" : "时间", selected.period],
                [lang === "en" ? "CONTEXT" : "项目背景", selected.context],
              ]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
            </dl>
            {selected.sections.map((section, i) => (
              <section className="case-section" key={i}>
                <span>0{i + 1} /</span>
                <h3>{section.title}</h3>
                {section.body.split("\n\n").map((text, j) => (
                  <p key={j}>{text}</p>
                ))}
              </section>
            ))}
            {selected.media.length > 0 && (
              <div className="case-gallery">
                {selected.media.map((m) => (
                  <figure key={m.id}>
                    <img src={m.url} alt={m.caption} loading="lazy" />
                    <figcaption>{m.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
            {selected.link && (
              <a
                className="case-link"
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {lang === "en"
                  ? "View team project & credits"
                  : "查看团队项目与完整名单"}
                <Icon />
              </a>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
