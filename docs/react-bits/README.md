# MagicBento provenance and integration

Source: React Bits `MagicBento-JS-CSS` registry.

- Requested endpoint: https://reactbits.dev/r/MagicBento-JS-CSS.json
- Retrieved from the official repository mirror: https://raw.githubusercontent.com/DavidHDev/react-bits/main/public/r/MagicBento-JS-CSS.json
- Exact retrieved JSON retained as `MagicBento-JS-CSS.json`.
- Upstream license retained as `LICENSE.md`.
- Registry dependency: `gsap@^3.13.0`, installed and locked in this application.

The direct registry endpoint returned HTTP 403 through the environment proxy. The requested `npx shadcn@latest add @react-bits/MagicBento-JS-CSS --yes` also failed while fetching the shadcn registry index. Component files and dependency were therefore installed from the official registry JSON manually, without introducing Tailwind or changing the React + Vite toolchain.

## Changes for this portfolio

`src/MagicBento.jsx` retains the registry's particle, spotlight, glow, tilt, magnetism and ripple implementation, with these integration changes:

- Children / className support and an `asChild` card path preserve the existing project, skill and shortcut grids, and actual button/article semantics.
- The requested configuration is shared in `src/main.jsx`; glow is `220, 231, 147` to match the site's existing accent, rather than purple.
- Styles are scoped, and demo geometry applies only to the standalone sample. Original glass framing stays in place.
- Text auto-hide clamps summaries to two lines; complete text remains in project dialogs.
- Tilt is limited to 5 degrees and magnetic movement to 5px with a 10px upward hover lift for comfortable use on wide image cards.
- Decorative effects are clipped within an aria-hidden card layer; border glow uses its separate pseudo-element. The document spotlight sits below native dialogs.
- The shared FX setting controls animation: ON explicitly enables it, AUTO respects system reduced-motion, OFF disables it. Devices without any hover-capable fine pointer stay static regardless of FX setting. GSAP tweens, generated nodes, timeouts and listeners are cleaned up; scrolling and window blur reset effects.
- The older glass tilt hook skips MagicBento cards so two animation systems do not write the same transform.
- All rendering paths use ParticleCard lifecycle cleanup, including the no-stars option.

No external runtime requests are needed for these effects.

Cinematic entrances now wrap each original card in `.scene-card-slot` so ScrollTrigger entrance transforms and MagicBento hover transforms remain independent. Featured project grid placement is transferred to its outer slot; the original button/article remains the interactive element. Hover tweens use GSAP's automatic overwrite to avoid an earlier enter/leave tween resetting pointer-driven rotation.
