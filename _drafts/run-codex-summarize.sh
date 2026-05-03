#!/bin/bash
# 25개 PR 원본 데이터를 codex로 1페이지 노트 요약
# 사용: bash _drafts/run-codex-summarize.sh
# 환경: 작업 디렉터리 = fe-faq-archive 루트
set -u
PROMPT_FILE="_drafts/codex-prompt.md"
RAW_DIR="_drafts/pr-raw"
OUT_DIR="_drafts/pr-analysis"
LOG_DIR="_drafts/pr-analysis/.logs"
mkdir -p "$OUT_DIR" "$LOG_DIR"

if [ ! -f "$PROMPT_FILE" ]; then
  echo "no prompt file: $PROMPT_FILE" >&2
  exit 1
fi

PROMPT_BODY="$(cat "$PROMPT_FILE")"

count=0
for raw in "$RAW_DIR"/pr-*.txt; do
  base=$(basename "$raw" .txt)        # pr-514
  n="${base#pr-}"                      # 514
  out="$OUT_DIR/$base.md"
  log="$LOG_DIR/$base.log"

  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "[skip] $base (already done)"
    continue
  fi

  count=$((count + 1))
  echo "[$count] codex on $base ..."

  # Combine prompt + raw as a single argument; raw goes after a header so codex sees both
  COMBINED=$(cat <<EOF
$PROMPT_BODY

---
## 입력 데이터 (PR #$n)

$(cat "$raw")
EOF
)

  # Use sandbox=read-only for safety; we only want stdout
  codex exec \
    --sandbox read-only \
    --skip-git-repo-check \
    --output-last-message "$out" \
    --color never \
    "$COMBINED" \
    > "$log" 2>&1

  if [ ! -s "$out" ]; then
    echo "  [FAIL] empty output, see $log"
  else
    size=$(wc -c < "$out")
    echo "  -> $out ($size bytes)"
  fi
done

echo "=== DONE ==="
ls -la "$OUT_DIR" | grep -v "^total\|^d" | tail -30
