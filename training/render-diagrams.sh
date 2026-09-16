#!/bin/sh
# Render training concept diagrams (mermaid -> PNG) using the app image.
#   host:  docker run --rm -v $PWD/training:/t ai-threatmodeler:local sh /t/render-diagrams.sh
set -e
cd /t
mkdir -p lessons/images .render
for d in diagrams/*.mmd; do
  name=$(basename "$d" .mmd)
  cp "$d" ".render/$name.md"
  printf '```mermaid\n' > ".render/$name.in.md"
  cat "$d" >> ".render/$name.in.md"
  printf '```\n' >> ".render/$name.in.md"
  rm -rf ".render/out/$name"
  mkdir -p ".render/out/$name"
  node /opt/ai-tm/scripts/mermaid-render.js ".render/$name.in.md" ".render/out/$name" >/dev/null 2>&1 \
    || { echo "FAIL $name"; continue; }
  cp ".render/out/$name/mermaid-01.png" "lessons/images/$name.png"
  echo "$name -> lessons/images/$name.png ($(stat -c%s "lessons/images/$name.png") bytes)"
done
rm -rf .render
chown -R 1000:1000 /t 2>/dev/null || true