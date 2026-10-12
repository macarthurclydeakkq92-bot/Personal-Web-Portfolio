import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/rajdhani/latin-500.css";
import "@fontsource/rajdhani/latin-600.css";
import "@fontsource/rajdhani/latin-700.css";
import "./style.css";
import { heroVideo } from "./site.js";
import projectArchive from "./projects.json";
import photographs from "./photography.json";
import { useGlassTilt } from "./useGlassTilt.js";
import MagicBento from "./MagicBento.jsx";
import YouTubeTrailer from "./YouTubeTrailer.jsx";
import { useSceneMotion } from "./useSceneMotion.js";
import { useMotionPreference } from "./useMotionPreference.js";
import { useOrbitMotion } from "./useOrbitMotion.js";
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
    role: "REAL-TIME VFX / TECHNICAL ART / PLAYER EXPERIENCE",
    title: ["Imagined worlds,", "brought to life."],
    intro:
      "Kangcheng Yuan — exploring how visual feedback connects game mechanics and player understanding.",
    explore: "Explore selected work",
    scroll: "SCROLL TO EXPLORE",
    about: "Practice & direction",
    aboutTitle: "From visual effects\nto player understanding.",
    bio: "I’m Kangcheng Yuan, a Game and Interactive Media Design student at Rensselaer Polytechnic Institute. Working across game design, environment art and real-time VFX has led me to a central question: how can visual feedback help players understand an action, read a threat and make a decision?",
    researchLabel: "Graduate direction",
    researchGoals:
      "I want to connect artistic decisions with a deeper understanding of shaders, GPU rendering and performance. Through graduate study, I hope to develop clearer visual feedback and evaluate it through player-centered testing.",
    interests: "Off the clock",
    interestsTitle: "A few moments,\nthrough my lens.",
    interestsIntro:
      "Photography is one of my personal hobbies. A small space for places, everyday moments and things that catch my eye.",
    photoPending: "Photography collection coming soon",
    photoThemes: [
      "Personal snapshots",
      "Places & small details",
      "Everyday moments",
    ],
    note: "Unity Particle System · Unreal Niagara · Maya · ZBrush · Substance Painter · Houdini",
    stats: [
      "Conduit Steam wishlists",
      "Two Sisters playtesters",
      "Wands and Tomes cards",
    ],
    work: "Selected projects",
    workTitle: "Making, testing,\nand asking why.",
    workNote:
      "Personal contributions, design decisions and reflections across team games and individual studies.",
    approach: "Questions I work with",
    approachTitle: "Visual intention.\nTechnical curiosity.",
    skills: [
      [
        "01",
        "How does feedback read?",
        "I explore how timing, scale and color communicate attacks, impact and interaction. My practical experience includes Unity particles and Unreal Niagara.",
        "GAME VFX",
      ],
      [
        "02",
        "How is an effect built?",
        "Graduate study will help me deepen material and shader mathematics, real-time rendering and performance analysis, building on my engine and asset-production experience.",
        "TECHNICAL ART",
      ],
      [
        "03",
        "What do players reveal?",
        "Playtests in Wands and Tomes showed me how a flexible card pattern could undermine its intended cost. I use player observations to question assumptions and refine a system.",
        "PLAYER EXPERIENCE",
      ],
    ],
    end: "CONTINUING THE EXPLORATION",
    endTitle: ["Let’s explore", "what comes next."],
    endText:
      "I’m preparing for graduate study in game development, technical art and interaction design. I welcome research conversations and selected studio collaborations.",
    pending: "Contact details coming soon",
    top: "Back to top",
    copyright: "Selected work & visual studies",
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
    role: "实时特效 / 技术美术 / 玩家体验",
    title: ["构筑想象，", "赋予世界生命。"],
    intro: "袁康成 — 探索视觉反馈如何连接游戏机制与玩家理解。",
    explore: "探索精选作品",
    scroll: "向下探索",
    about: "创作实践与方向",
    aboutTitle: "从视觉效果，\n走向玩家理解。",
    bio: "我是袁康成，就读于伦斯勒理工学院游戏与交互媒体设计专业。在游戏设计、场景美术与实时特效的交叉实践中，我逐渐关注一个核心问题：视觉反馈如何帮助玩家理解动作、辨认威胁，并作出决定？",
    researchLabel: "研究生学习方向",
    researchGoals:
      "我希望把艺术判断与着色器、GPU 渲染和性能分析的系统理解相连接，通过研究生学习设计更清晰的视觉反馈，并在以玩家为中心的测试中检验它。",
    interests: "闲暇时光",
    interestsTitle: "镜头里，\n留住一些日常。",
    interestsIntro:
      "摄影是我的个人爱好。这里会放一些喜欢的风景、路过的地方和日常瞬间。",
    photoPending: "摄影作品待补充",
    photoThemes: ["随手记录", "风景与小细节", "日常瞬间"],
    note: "Unity 粒子系统 · Unreal Niagara · Maya · ZBrush · Substance Painter · Houdini",
    stats: [
      "Conduit Steam 愿望单",
      "Two Sisters 测试玩家",
      "Wands and Tomes 卡牌",
    ],
    work: "精选项目",
    workTitle: "制作、测试，\n并追问原因。",
    workNote: "通过团队游戏与个人实验，展示个人贡献、设计决策与创作反思。",
    approach: "我关注的问题",
    approachTitle: "视觉意图，\n与技术好奇心。",
    skills: [
      [
        "01",
        "玩家如何读懂反馈？",
        "探索时序、尺度与色彩如何传达攻击、受击和交互信息。我的实践包括 Unity 粒子系统与 Unreal Niagara。",
        "游戏特效",
      ],
      [
        "02",
        "效果如何被构建？",
        "希望通过研究生学习深化材质与着色器数学、实时渲染和性能分析，在已有引擎与资产制作经验上建立更系统的技术理解。",
        "技术美术",
      ],
      [
        "03",
        "玩家测试揭示了什么？",
        "Wands and Tomes 的测试让我发现，灵活的卡牌图案可能破坏预期的成本约束。我通过玩家行为检验假设，并持续改进系统。",
        "玩家体验",
      ],
    ],
    end: "继续探索",
    endTitle: ["一起探索，", "下一种可能。"],
    endText:
      "我正在准备游戏开发、技术美术与交互设计方向的研究生申请，也期待研究交流与合适的工作室合作。",
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
  useOrbitMotion(motion.enabled);
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
          <span className="opening-kicker">
            KANGCHENG YUAN / VISUAL PRACTICE
          </span>
          <div className="opening-mask">
            <span className="opening-name">
              <span>KANGCHENG</span>
              <span>YUAN</span>
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
        <a className="brand" href="#home" aria-label="Kangcheng Yuan home">
          <span>KANGCHENG</span>
          <span>YUAN</span>
        </a>
        <span className="nav-caption">REAL-TIME VFX / 袁康成</span>
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
            <div className="radar-orbit orbit-outer">
              <span className="orbit-rotor">
                <svg viewBox="0 0 200 200" fill="none">
                  <circle className="orbit-track" cx="100" cy="100" r="96" />
                  <circle className="orbit-segments" cx="100" cy="100" r="93" />
                  <circle className="orbit-point" cx="100" cy="7" r="2.2" />
                </svg>
              </span>
            </div>
            <div className="radar-orbit orbit-inner">
              <span className="orbit-rotor">
                <svg viewBox="0 0 200 200" fill="none">
                  <circle className="orbit-track" cx="100" cy="100" r="96" />
                  <circle className="orbit-segments" cx="100" cy="100" r="94" />
                  <path
                    className="orbit-bracket"
                    d="M95 2h10M198 95v10M105 198H95M2 105V95"
                  />
                </svg>
              </span>
            </div>
            <div className="radar-ticks" />
            <div className="radar-landscape">
              <img src="/assets/conduit-gameplay.webp" alt="" />
              <div className="radar-contours" />
              <div className="radar-sweep" />
            </div>
            <span className="radar-cross cross-one">+</span>
            <span className="radar-cross cross-two">+</span>
            <span className="radar-marker" />
            <span className="radar-label">KANGCHENG YUAN / CREATIVE FIELD</span>
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
                GRADUATE PORTFOLIO <span>FALL 2027</span>
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
                <span className="operator-mark">KY /</span>
                <div>
                  <strong>KANGCHENG YUAN</strong>
                  <span>
                    {lang === "en"
                      ? "Game VFX · Visual · Interaction"
                      : "游戏特效 · 视觉 · 交互"}
                  </span>
                </div>
                <span className="operator-code">KY—01</span>
              </div>
            </div>
            <aside
              className="hero-projects"
              aria-label={lang === "en" ? "Project shortcuts" : "项目快捷入口"}
            >
              <div className="panel-heading">
                <span className="dot" />
                {lang === "en" ? "PROJECT INDEX" : "项目索引"}
                <span>01—{String(projects.length).padStart(2, "0")}</span>
              </div>
              <MagicBento
                {...magicEffects}
                disableAnimations={!motion.enabled}
                className="index-cards"
              >
                {["conduit", "coastal-shrine", "visual-studies"]
                  .map((slug) => projects.findIndex((p) => p.slug === slug))
                  .map((i) => (
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
                KANGCHENG YUAN
                <br />
                <span>CREATIVE PRACTICE</span>
              </div>
              <span className="portrait-note">PORTRAIT PLACEHOLDER</span>
            </div>
            <div className="about-copy">
              <MotionHeading lines={t.aboutTitle} />
              <p className="body-copy">{t.bio}</p>
              <div className="graduate-focus">
                <span>{t.researchLabel}</span>
                <p>{t.researchGoals}</p>
              </div>
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
                className={`project project-${i} ${p.slug === "afterlight" ? "project--prototype" : ""}`}
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
                    {p.slug === "afterlight"
                      ? lang === "en"
                        ? "EXPERIMENTAL PROTOTYPE"
                        : "实验性原型"
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
        <section className="interests section wrap" id="interests">
          <div className="section-label">
            <span>04 /</span>
            {t.interests}
          </div>
          <div className="section-heading">
            <MotionHeading lines={t.interestsTitle} />
            <p className="interests-intro">{t.interestsIntro}</p>
          </div>
          <MagicBento
            {...magicEffects}
            disableAnimations={!motion.enabled}
            className="interest-grid"
          >
            {(photographs.length ? photographs : [null, null, null]).map(
              (photo, i) => (
                <figure className="photography-card" key={photo?.id || i}>
                  <div
                    className="photograph-frame"
                    style={photo ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined}
                  >
                    {photo ? (
                      <a
                        href={photo.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${photo.caption?.[lang] || photo.caption?.en} — ${lang === "zh" ? "查看大图（新标签页）" : "View full photo (new tab)"}`}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt?.[lang] || photo.alt?.en || ""}
                          loading="lazy"
                          width={photo.width}
                          height={photo.height}
                        />
                      </a>
                    ) : (
                      <div className={`photo-empty photo-empty-${i}`}>
                        <span className="photo-frame-mark" aria-hidden="true" />
                        <span className="photo-empty-caption">
                          {t.photoPending}
                        </span>
                      </div>
                    )}
                  </div>
                  <figcaption>
                    <span>0{i + 1} /</span>
                    <strong>
                      {photo
                        ? photo.caption?.[lang] || photo.caption?.en
                        : t.photoThemes[i]}
                    </strong>
                    {photo?.location && <small>{photo.location}</small>}
                  </figcaption>
                </figure>
              ),
            )}
          </MagicBento>
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
                <span>KANGCHENG</span>
                <span>YUAN</span>
              </a>
              <span>© 2026 KANGCHENG YUAN · {t.copyright}</span>
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
            {selected.media.some(
              (m) => m.type === "video" || m.type === "youtube",
            ) && (
              <div className="case-videos case-gallery">
                {selected.media
                  .filter((m) => m.type === "video" || m.type === "youtube")
                  .map((m) => (
                    <figure key={m.id}>
                      {m.type === "youtube" ? (
                        <YouTubeTrailer
                          videoId={m.videoId}
                          poster={m.poster}
                          title={`${selected.title} — ${lang === "en" ? "Trailer" : "预告片"}`}
                          language={lang}
                        />
                      ) : (
                        <video
                          controls
                          playsInline
                          preload="none"
                          poster={m.poster}
                          aria-label={m.caption}
                        >
                          <source src={m.url} type="video/mp4" />
                        </video>
                      )}
                      <figcaption>{m.caption}</figcaption>
                    </figure>
                  ))}
              </div>
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
            {selected.media.some(
              (m) => m.type !== "youtube" && m.type !== "video",
            ) && (
              <div className="case-gallery">
                {selected.media
                  .filter((m) => m.type !== "youtube" && m.type !== "video")
                  .map((m) => (
                    <figure key={m.id}>
                      <img src={m.url} alt={m.caption} loading="lazy" />
                      <figcaption>{m.caption}</figcaption>
                    </figure>
                  ))}
              </div>
            )}
            {selected.document && (
              <a
                className="text-link case-document"
                href={selected.document}
                target="_blank"
                rel="noopener noreferrer"
              >
                {lang === "en"
                  ? "Read technical document (PDF)"
                  : "查看技术文档（PDF）"}
                <Icon />
              </a>
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
