#!/usr/bin/env bash
# Batch VLM realism review of all GLOPROFAS images.
# Reviews images in groups of 8, writes compact verdicts to scripts/image-review-results.txt
cd /home/z/my-project
OUT=scripts/image-review-results.txt
: > "$OUT"

PROMPT='You are a strict photo editor auditing images for a professional anti-fraud website. The standard is ULTRAREALISTIC documentary/editorial photography (100% photorealistic, indistinguishable from a real photo).
For EACH numbered image, output ONE line in this exact format:
IMG<n> | SCORE <0-100> | PASS or FAIL | artifacts: <brief list of AI artifacts if any: plastic/waxy skin, warped hands or faces, gibberish or fake text, impossible objects, cartoon/illustration/3D-render look, over-smoothing, wrong anatomy, weird lighting>
Judge strictly. A score below 90 is FAIL.'

review_group() {
  local -a imgs=("$@")
  local args=()
  for img in "${imgs[@]}"; do args+=( -i "$img" ); done
  echo "=== GROUP: ${imgs[*]}" >> "$OUT"
  z-ai vision -p "$PROMPT" "${args[@]}" -o /tmp/vlm-out.json >/dev/null 2>&1
  if [ -f /tmp/vlm-out.json ]; then
    bun -e 'const j=require("/tmp/vlm-out.json"); console.log(j.choices?.[0]?.message?.content ?? "NO CONTENT")' >> "$OUT" 2>/dev/null || echo "PARSE_ERROR" >> "$OUT"
    rm -f /tmp/vlm-out.json
  else
    echo "CLI_ERROR" >> "$OUT"
  fi
}

# context images (likely real stock)
CONTEXT=(public/images/context/*.jpg)
# gen images (AI generated)
GEN=(public/images/gen/*.jpg)
# zite images (from old site)
ZITE=(public/images/zite/*.jpg)

i=0
group=()
for img in "${CONTEXT[@]}"; do
  group+=("$img"); i=$((i+1))
  if [ $((i % 8)) -eq 0 ]; then review_group "${group[@]}"; group=(); fi
done
if [ ${#group[@]} -gt 0 ]; then review_group "${group[@]}"; fi

i=0; group=()
for img in "${GEN[@]}"; do
  group+=("$img"); i=$((i+1))
  if [ $((i % 8)) -eq 0 ]; then review_group "${group[@]}"; group=(); fi
done
if [ ${#group[@]} -gt 0 ]; then review_group "${group[@]}"; fi

i=0; group=()
for img in "${ZITE[@]}"; do
  group+=("$img"); i=$((i+1))
  if [ $((i % 8)) -eq 0 ]; then review_group "${group[@]}"; group=(); fi
done
if [ ${#group[@]} -gt 0 ]; then review_group "${group[@]}"; fi

echo "DONE" >> "$OUT"
