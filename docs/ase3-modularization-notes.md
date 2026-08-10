# ASE3 Modularization Notes

This package keeps `ase2.html` as the exact production baseline supplied by the user.

`ase3.html` is the first modular explorer version:

- CSS extracted to `css/explorer-v2.css`
- JavaScript extracted to `js/explorer-v2.js`
- The explorer DOM and rendering logic remain otherwise unchanged for functional parity
- A small app navigation bar links to ASE2 baseline, Business Guide, Architecture, Learning, and About

## Validation Goal

Before GitHub Pages deployment, compare:

- `ase2.html` baseline
- `ase3.html` modular version

They should render and behave the same, except for the added navigation and visible ASE3 label.
