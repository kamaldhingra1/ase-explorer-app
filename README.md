# SATF ASE2 Enterprise App

This package reorganizes the SATF Agentic Attack Surface Explorer into an enterprise-app style static site while keeping `ase2.html` as the primary explorer route.

## Structure

```text
/
├── ase2.html
├── guide/
│   ├── index.html
│   ├── layers.html
│   ├── components.html
│   └── impacts.html
├── architecture/index.html
├── learning/index.html
├── about/index.html
├── css/
├── js/
├── data/
└── diagrams/
```

## Navigation Rules

All links use explicit file references. No folder-only routes.

Root page links:

```html
./ase2.html
./guide/index.html
./architecture/index.html
./learning/index.html
./about/index.html
```

Sub-page links:

```html
../ase2.html
../guide/index.html
../architecture/index.html
../learning/index.html
../about/index.html
```

## Active Tab Model

Each page uses:

```html
<body data-page="guide">
```

`js/app.js` marks the active navigation item by matching `data-nav`.

## Migration Note

Replace the placeholder content in `ase2.html` with the current known-good ASE2 explorer body, then gradually extract CSS and JS in small commits.
