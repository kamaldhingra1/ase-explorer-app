# ASE v2.0 M1.2 - Simpilot ASE3 Runtime Style Fix

## Updates

- Fixed ASE3 broken Simpilot rendering by injecting Simpilot runtime styles from `js/simpilot.js`.
- This protects ASE3 because ASE3 does not load `css/main.css`.
- Added an `x` close control to hide the informational Key Insight area.
- Keeps the amber collapsed launcher and amber expanded header.

## Files to deploy

Required:

- `js/simpilot.js`

Recommended for consistency if you have not already deployed M1.1:

- `css/main.css`

Optional:

- `docs/ASE-v2.0-M1.2-Simpilot-ASE3-Fix-Notes.md`
