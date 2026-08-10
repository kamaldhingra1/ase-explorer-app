# ASE3 Script Fix

Fixed ASE3 modularization where the external script tag was accidentally inserted into JavaScript content because source offsets were reused after earlier replacements.

Correct structure now:

```html
<link rel="stylesheet" href="./css/explorer-v2.css">
...
<script src="./js/explorer-v2.js"></script>
```

Validation performed:

- `ase3.html` contains one external explorer script tag near the end of the document.
- `js/explorer-v2.js` passes `node --check`.
- The inline production script was fully extracted into `js/explorer-v2.js`.
