# Scone Studio archive import — 2026-10-11

Imported from the user-provided `Scone_Studio_Archive_2026-10-11.zip`. Every entry in the supplied SHA-256 manifest was verified before import.

## Included

- Five public project snapshots: Conduit, Wands and Tomes, Two Sisters, Karkinos’ Ascension, Afterlight.
- Seven original WebP assets and favicon, self-hosted under `public/assets`.
- Full project sections, project attribution, roles, tools, period, external Steam/itch.io links and available process galleries. English source text retained; Chinese translations in `src/projects.json`.
- Conduit and Wands and Tomes titles normalized to their actual project names; source snapshots had their final section headings as titles.
- Two Sisters role/date/tools and additional contribution details supplemented from the previously supplied résumé, explicitly described in the case study.
- Original seed content retained in `docs/archive-projects.json`. Coastal Shrine, Visual Studies and New Project are hidden in the supplied seed and remain outside the public project list.

## Image attribution

Team screenshots represent shared productions, rather than claiming that every visible asset is individual work. Project case studies describe personal contributions and link to public credits.

Afterlight's public snapshot has no cover and documents a paused Unity 2022.3 prototype. Historical AI concept imagery and a previous UE5 BP_MemoryTarget screenshot are displayed only in a separately captioned gallery. Neither is presented as current Unity gameplay. The cover remains original abstract artwork and states that current Unity visuals are pending.

## Implementation

The existing React + Vite site and Cloudflare Pages build contract are retained. The archive's legacy hosting adapters, editor/auth endpoints, and database-dependent implementation are not needed for this static portfolio. No archive scripts were executed. No deployment credentials were imported. Archive text is rendered as React text, never injected HTML.

The hero's original SVG icons, circular image treatment, panel geometry and navigation reference the supplied game UI's visual organization. The game reference screenshot and logos are not used as website assets. Hero video support remains available through `src/site.js`; the archive contains no playable video file.

Update 2026-10-12: the newly supplied original videos and environment-art PDF allow Coastal Shrine and Visual Studies (displayed as Procedural Motion) to appear publicly. The original hidden seed records remain as archive evidence, and current website data is in src/projects.json. New Project remains hidden.
