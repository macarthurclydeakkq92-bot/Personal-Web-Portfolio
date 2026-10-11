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

Biography, project descriptions, experience and metrics are based on Kangcheng Yuan’s supplied résumé. Portrait and project artwork are explicitly marked as placeholders. Replace these with original media before launch. Contact uses the résumé email; the phone number and résumé PDF are not published.

For the hero video, add an optimized, silent H.264 MP4 at `public/hero.mp4` and set `heroVideo` in `src/site.js` to `/hero.mp4`. The site uses inline muted autoplay and retains its original CSS artwork when the file is missing or video cannot play. Reduced-motion users see the static artwork. No video is included yet.

## Cloudflare Pages / scone.studio

Connect this GitHub repository to Cloudflare Pages, select the `main` branch, use build command `npm run build` and output directory `dist`. Use Node 24 in the build environment (`NODE_VERSION=24`). No application secrets are required. Add `scone.studio` through the Pages project's Custom domains panel. Let Cloudflare create the required DNS record; inspect existing DNS entries before replacing anything. Optionally attach `www.scone.studio` and configure a redirect to the apex domain.

Domain attachment and DNS changes require access to your Cloudflare account and have not been performed by this repository.
