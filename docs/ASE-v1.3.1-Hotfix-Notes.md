# ASE v1.3.1 Hotfix Notes

## Fixed

- Fixed Explorer risk rendering issue where Threats & Risks could appear empty after selecting a node.
- Root cause: v1.3 risk-to-defense panel referenced `INCIDENT_CHAINS`, while the Explorer uses `CHAINS`. This caused risk-chip rendering to fail during node selection.
- Added a small defensive guard around component risk rendering.

## Impact

- Node selection now shows risks again.
- Existing v1.3 functionality is preserved.
