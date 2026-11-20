#!/usr/bin/env bash
# Round-2 VLM realism review — reviews every image actively rendered on the site.
# Appends compact verdicts to scripts/image-review-round2.txt (resume-safe).
cd /home/z/my-project
OUT=scripts/image-review-round2.txt
touch "$OUT"

PROMPT='You are a strict photo editor auditing images for a professional anti-fraud website. The standard is ULTRAREALISTIC documentary/editorial photography (100% photorealistic, indistinguishable from a real photo).
For EACH numbered image, output ONE line in this exact format:
IMG<n> | SCORE <0-100> | PASS or FAIL | artifacts: <brief list of AI artifacts if any: plastic/waxy skin, warped hands or faces, gibberish or fake text, impossible objects, cartoon/illustration/3D-render look, over-smoothing, wrong anatomy, weird lighting>
Judge strictly. A score below 90 is FAIL.'

review_group() {
  local -a imgs=("$@")
  # skip if this group header already reviewed
  if rg -qF "=== GROUP: ${imgs[*]}" "$OUT" 2>/dev/null; then
    echo "SKIP (already reviewed): ${imgs[0]} ..."
    return
  fi
  local args=()
  for img in "${imgs[@]}"; do args+=( -i "public${img}" ); done
  echo "=== GROUP: ${imgs[*]}" >> "$OUT"
  z-ai vision -p "$PROMPT" "${args[@]}" -o /tmp/vlm-out2.json >/dev/null 2>&1
  if [ -f /tmp/vlm-out2.json ]; then
    bun -e 'const j=require("/tmp/vlm-out2.json"); console.log(j.choices?.[0]?.message?.content ?? "NO CONTENT")' >> "$OUT" 2>/dev/null || echo "PARSE_ERROR" >> "$OUT"
    rm -f /tmp/vlm-out2.json
    echo "reviewed: ${imgs[0]} ... ${imgs[-1]}"
  else
    echo "CLI_ERROR" >> "$OUT"
    echo "CLI ERROR on group starting ${imgs[0]}"
  fi
}

# Build the review list: every used image except dormant zite references.
# Dormant zite refs (category/resource fallbacks never rendered) are excluded.
mapfile -t ALL < <(sort -u /tmp/used-unique.txt)

EXCLUDE=(
  "/images/zite/img_BPedTDWHGQzb-FZp.jpg"
  "/images/zite/img_RNp07pYUDwb_i1sA.jpg"
  "/images/zite/img_JX8TbpNwVvMe9H2u.jpg"
  "/images/zite/img_2VpUb4pq-e8YvIr-.jpg"
  "/images/zite/img_S-KECSoRY5SCp7RJ.jpg"
  "/images/zite/img_26twh5qIAbvzqRdl.jpg"
  "/images/zite/img_vjmeNsjN4mRiRXTp.jpg"
  "/images/zite/img_9nFXPoNmoeCwAfJE.jpg"
  "/images/zite/img_k_g-Bue4ibKanRTu.jpg"
  "/images/zite/img_wFZrRplDj0fdHgRB.jpg"
)

is_excluded() {
  for e in "${EXCLUDE[@]}"; do [ "$1" = "$e" ] && return 0; done
  return 1
}

REVIEW=()
for img in "${ALL[@]}"; do
  is_excluded "$img" || REVIEW+=("$img")
done

echo "Reviewing ${#REVIEW[@]} rendered images..."

i=0; group=()
for img in "${REVIEW[@]}"; do
  group+=("$img"); i=$((i+1))
  if [ $((i % 6)) -eq 0 ]; then review_group "${group[@]}"; group=(); fi
done
[ ${#group[@]} -gt 0 ] && review_group "${group[@]}"

echo "DONE" >> "$OUT"
echo "ALL DONE"
