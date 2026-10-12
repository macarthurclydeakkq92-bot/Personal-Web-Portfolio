# SCONE Studio

React + Vite portfolio for game VFX, visual design and interaction design. English by default; Simplified Chinese is available in the navigation. Language selection is remembered locally.

## Development

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

Production: `npm run build`. Validate locally with `npm run preview`.

## Content to supply

Biography, project descriptions, experience and metrics are based on Kangcheng Yuan’s supplied résumé. Project artwork, descriptions and process notes were imported from the supplied Scone Studio archive. `src/projects.json` holds bilingual case studies and project links; media are self-hosted in `public/assets`. Portrait artwork remains a placeholder. Contact uses the résumé email; the phone number and résumé PDF are not published.

For the hero video, add an optimized, silent H.264 MP4 at `public/hero.mp4` and set `heroVideo` in `src/site.js` to `/hero.mp4`. The site uses inline muted autoplay and retains its original CSS artwork when the file is missing or video cannot play. Reduced-motion users see the static artwork. No video is included yet. The hero currently uses Conduit team imagery inside an original circular field interface inspired by the supplied Endfield UI reference. No reference-game assets are bundled.

## Cloudflare Pages / scone.studio

Connect this GitHub repository to Cloudflare Pages, select the `main` branch, use build command `npm run build` and output directory `dist`. Use Node 24 in the build environment (`NODE_VERSION=24`). No application secrets are required. Add `scone.studio` through the Pages project's Custom domains panel. Let Cloudflare create the required DNS record; inspect existing DNS entries before replacing anything. Optionally attach `www.scone.studio` and configure a redirect to the apex domain.

Domain attachment and DNS changes require access to your Cloudflare account and have not been performed by this repository.

## Archive import

Five public projects are integrated, with original English content and Simplified Chinese translations. Team imagery is captioned; Afterlight’s historical AI concept and UE5 screenshot are clearly distinguished from its current paused Unity prototype. Source provenance is retained in `docs/asset-sources.json`. The three hidden seed projects remain in `docs/archive-projects.json` and are not published as finished work. See `docs/archive-import.md` for details.

## Cinematic motion

`src/useSceneMotion.js` registers GSAP ScrollTrigger and owns the opening and scroll choreography. A roughly five-second opening combines a studio mark, curtain reveal, compressed/skewed masked typography, circular image reveal and staggered navigation panels. Fresh non-anchor landings start at the hero, so Chrome scroll restoration does not silently skip the opening. Scrolling away skips the remaining opening without locking the page.

Section titles enter through line masks before viewport-triggered card and image reveals. Cards move through outer `.scene-card-slot` frames while MagicBento keeps ownership of the actual interactive card transforms. Desktop images have a small smoothed parallax; mobile retains reveals without parallax. Effects play once per viewport entry and use transform/clip-path, without animating blur or layout dimensions. The header FX selector defaults to ON (the requested full motion), AUTO follows the system reduced-motion preference, and OFF shows static content. The choice is remembered locally. Language changes and media-query cleanup revert the GSAP context and its ScrollTriggers.

Hover capabilities are detected with `any-hover` / `any-pointer` rather than viewport width or primary touch input. A desktop mouse remains supported in narrow windows and on hybrid devices; touch-only devices stay stable.

## New media and orbit motion

The uploaded environment-art final, technical PDF, fracture render and solver-motion render add Coastal Shrine and Procedural Motion, bringing the portfolio to seven projects. Original media hashes and web encoding notes are in `docs/new-media-manifest.json`. Three optimized silent videos total about 3.3 MB; they load only when explicitly played in a project dialog (`preload="none"`). The Coastal Shrine document credits external assets and documents the effects actually implemented.

`src/useOrbitMotion.js` rotates nested SVG ring layers independently of the opening, with opposite directions, a slower tick ring and a scanning layer. It pauses outside the hero and in hidden tabs, and respects the shared FX setting. Title depth uses layered text shadows rather than an additional renderer. No new dependency was needed.

## Display typography and identity

Public identity is KANGCHENG YUAN, with a KY favicon and no registered-trademark symbol. Rajdhani Latin 500/600/700 is bundled locally through `@fontsource/rajdhani` for an angular anime/mecha display treatment. Body and Chinese text retain readable system fallbacks. Font license is in `docs/fonts/Rajdhani-LICENSE.txt`.

Conduit also includes the supplied approximately 40-second gameplay capture. Its 854×480 framing and game audio are retained in a 30fps H.264/AAC faststart web encode (~9.5 MB), loaded only on explicit playback. The new gameplay poster is used in the project card, project shortcut and hero circle. Original archive imagery remains retained. Provenance and encoding details: `docs/conduit-gameplay-media.json`.

Two Sisters includes the user-supplied YouTube trailer (`XJG6Q_G4QKY`). Its local poster loads immediately; the privacy-enhanced `youtube-nocookie.com` iframe is created only after pressing Play. The external YouTube watch link stays available, and closing the project dialog unmounts the player. Embed mounting, URL, bilingual controls, mobile aspect ratio and cleanup were checked using a mocked iframe response; this cloud environment's YouTube request returned 403, so actual playback and uploader embedding permissions were not verified here.

Project media placement is consistent: cover, then all presentation videos (local MP4 or YouTube), then role facts and case-study sections. Process-image galleries remain after the sections. This applies automatically to future projects through the shared `case-videos` render path.

Fast scrolling or jumping to the footer completes pending entrances already passed or currently in view. The opening can be skipped even before its timeline has started ticking. A passive scroll listener batches checks into one animation frame; ordinary slower scrolling retains the cinematic sequences. Desktop and mobile initial jumps to the bottom were verified for immediate visible headings/cards and usable project buttons on return.

## Graduate-application direction and photography

The site is primarily a graduate portfolio for Fall 2027. Public copy connects real-time VFX, player perception, playtesting and future study of shaders/rendering/performance; it does not present those learning goals as completed research or established expertise. The internship remains July–August 2025, confirmed by the owner. Uploaded SOP and school-selection files are not published in this repository.

The `#interests` section precedes the final contact page. `src/photography.json` is initially empty, and all three visible slots explicitly say that photography is coming soon. To add actual photography, place optimized images under `public/assets/photography/` and add entries with `id`, `src`, `width`, `height`, bilingual `alt` and bilingual `caption`; `location` is optional. The empty state is automatically replaced with supplied images. Do not publish sample images as personal photography.

Example entry shape (replace all placeholders with actual details):

```json
{
  "id": "photo-01",
  "src": "/assets/photography/photo-01.webp",
  "width": 1200,
  "height": 1600,
  "alt": {"en": "Description of the actual photograph", "zh": "照片的真实内容描述"},
  "caption": {"en": "Photograph title", "zh": "照片标题"}
}
```

School-specific submission requirements need separate official verification. The website's existence and technical validation do not prove that every program accepts a URL instead of prescribed files or creative tasks.
