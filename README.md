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
