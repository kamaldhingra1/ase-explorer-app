# ASE v2.1 M1.3 Completion Incremental Patch

## Required files
- `ase3.html`
- `js/simpilot.js`
- `about/index.html`
- `sitemap.html`
- `sitemap.xml`

## Changes
- Added the Incident Library representative-scenario note directly in ASE3 markup.
- Added a narrow, event-driven Simpilot safe-dock state for the Incident Library and attack-path modal.
- Restored page-level Learning Mode when the component/incident drawer closes.
- Corrected the About page What’s Next link by removing an accidental leading space.
- Repaired the visible What’s Next entry in the HTML sitemap.
- Retained the custom-domain XML sitemap entry and updated its last-modified date.

## Safety
- No runtime navigation injection.
- No new DOM-wide MutationObserver.
- No changes to Explorer data, incidents, threats, map geometry, or mobile controls.
