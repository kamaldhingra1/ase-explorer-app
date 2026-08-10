# Deployment Notes

- `index.html` is now a landing page, not a redirect.
- `ase2.html` is the production explorer file supplied by the user.
- The production explorer is intentionally kept mostly intact. A small floating app nav was added to link to guide, architecture, learning, and about pages.
- Business Guide and Learning pages now include static content, so they are useful even before JSON-driven rendering completes.
- If opening locally via `file://`, browser security may block JSON `fetch()` calls. Use GitHub Pages or a local static server for full dynamic rendering.
