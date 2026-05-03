#!/bin/bash
# 25개 PR 원본 데이터를 codex로 1페이지 노트 요약 (shard 병렬 + per-PR timeout)
# 사용: bash _drafts/run-codex-summarize.sh <shard_id> <total_shards>
set -u
SHARD_ID="${1:-0}"
TOTAL_SHARDS="${2:-1}"
PROMPT_FILE="_drafts/codex-prompt.md"
RAW_DIR="_drafts/pr-raw"
OUT_DIR="_drafts/pr-analysis"
LOG_DIR="_drafts/pr-analysis/.logs"
mkdir -p "$OUT_DIR" "$LOG_DIR"
PER_PR_TIMEOUT="${PER_PR_TIMEOUT:-240}"   # 4 min hard cap

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
  echo "[shard $SHARD_ID] [$count] codex on $base (timeout=${PER_PR_TIMEOUT}s) ..."

  COMBINED=$(cat <<EOF
$PROMPT_BODY

---
## 입력 데이터 (PR #$n)

$(cat "$raw")
EOF
)

  # gtimeout(coreutils) or timeout(linux). On macOS, gtimeout via brew install coreutils
  TIMEOUT_BIN=$(command -v gtimeout || command -v timeout || true)

  if [ -n "$TIMEOUT_BIN" ]; then
    "$TIMEOUT_BIN" "$PER_PR_TIMEOUT" codex exec \
      --sandbox read-only \
      --skip-git-repo-check \
      --output-last-message "$out" \
      --color never \
      "$COMBINED" \
      > "$log" 2>&1
    rc=$?
  else
    codex exec \
      --sandbox read-only \
      --skip-git-repo-check \
      --output-last-message "$out" \
      --color never \
      "$COMBINED" \
      > "$log" 2>&1
    rc=$?
  fi

  if [ ! -s "$out" ]; then
    echo "[shard $SHARD_ID]   [FAIL rc=$rc] empty output for $base, see $log"
  else
    size=$(wc -c < "$out")
    echo "[shard $SHARD_ID]   -> $out ($size bytes, rc=$rc)"
  fi
done

echo "[shard $SHARD_ID] === DONE ==="
