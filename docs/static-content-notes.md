# Static Content Notes

Business Guide subpages now contain static HTML fallback content in addition to JSON-driven rendering. This means layers, components, and impacts display even if a browser blocks local JSON fetches under `file://`.

Learning Center now includes static linked subpages:

- `learning/executive.html`
- `learning/architect.html`
- `learning/practitioner.html`

When served through GitHub Pages or a local HTTP server, `js/guide.js` enhances the Business Guide from `data/business-guide.json`. If JSON loading fails, the static content remains visible.
