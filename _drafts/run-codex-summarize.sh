#!/bin/bash
# 25개 PR 원본 데이터를 codex로 1페이지 노트 요약 (shard 병렬 지원)
# 사용: bash _drafts/run-codex-summarize.sh <shard_id> <total_shards>
#   예: bash _drafts/run-codex-summarize.sh 0 4   # 0번째 shard (총 4개 중)
# shard 미지정 시 전체 순차 처리
set -u
SHARD_ID="${1:-0}"
TOTAL_SHARDS="${2:-1}"
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
idx=-1
for raw in "$RAW_DIR"/pr-*.txt; do
  idx=$((idx + 1))
  if [ "$TOTAL_SHARDS" -gt 1 ]; then
    if [ $((idx % TOTAL_SHARDS)) -ne "$SHARD_ID" ]; then
      continue
    fi
  fi

  base=$(basename "$raw" .txt)
  n="${base#pr-}"
  out="$OUT_DIR/$base.md"
  log="$LOG_DIR/$base.log"

  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "[shard $SHARD_ID] [skip] $base"
    continue
  fi

  count=$((count + 1))
  echo "[shard $SHARD_ID] [$count] codex on $base ..."

  COMBINED=$(cat <<EOF
$PROMPT_BODY

---
## 입력 데이터 (PR #$n)

$(cat "$raw")
EOF
)

  codex exec \
    --sandbox read-only \
    --skip-git-repo-check \
    --output-last-message "$out" \
    --color never \
    "$COMBINED" \
    > "$log" 2>&1

  if [ ! -s "$out" ]; then
    echo "[shard $SHARD_ID]   [FAIL] empty output for $base, see $log"
  else
    size=$(wc -c < "$out")
    echo "[shard $SHARD_ID]   -> $out ($size bytes)"
  fi
done

echo "[shard $SHARD_ID] === DONE ==="
