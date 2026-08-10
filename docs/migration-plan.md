# Migration Plan

1. Keep the production filename as `ase2.html`.
2. Replace the placeholder body of `ase2.html` with the known-good current explorer.
3. Add the enterprise navigation header to the existing explorer.
4. Move non-mobile CSS into `css/explorer.css` in small chunks.
5. Move mobile-only CSS into `css/mobile.css`.
6. Move mobile zoom handlers into `js/mobile.js`.
7. Keep Business Guide pages separate from explorer changes.
