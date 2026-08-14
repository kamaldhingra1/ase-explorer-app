# ASE v2.0 Phase 2.2 - Simpilot Key Insight Coverage Fix

## Updates

- Keeps the working ASE3 risk context mechanism from Phase 2.1.
- Expands Key Insight routing so more ASE3 risks get meaningful insights instead of the generic default message.
- Uses both the risk name and the expanded risk details such as impact and mitigation text.
- Adds a contextual fallback for any selected risk that does not match a known category.

## Files to deploy

Required:

- `js/simpilot.js`

Optional:

- `docs/ASE-v2.0-Phase2.2-Simpilot-Insight-Coverage-Notes.md`
