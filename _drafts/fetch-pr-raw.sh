#!/bin/bash
# 8기 페이먼츠 1단계 PR 원본 데이터 수집
# 사용: bash _drafts/fetch-pr-raw.sh
set -e
REPO="woowacourse/react-payments"
OUT="_drafts/pr-raw"
mkdir -p "$OUT"

# 분석 대상 PR (포도 503/508, 레스 504 중복 제외)
PRS=(497 498 499 500 501 502 505 506 507 509 510 511 512 513 514 515 516 517 518 519 520 521 522 523 524)

for n in "${PRS[@]}"; do
  if [ -f "$OUT/pr-$n.txt" ]; then
    echo "[skip] pr-$n.txt"
    continue
  fi
  echo "[fetch] PR #$n"
  {
    echo "===== PR #$n META ====="
    gh pr view "$n" --repo "$REPO" --json number,title,body,state,author,additions,deletions,changedFiles,reviews,comments 2>&1 | jq '.'
    echo ""
    echo "===== PR #$n REVIEW THREADS (line comments) ====="
    gh api "repos/$REPO/pulls/$n/comments" --paginate 2>&1 | jq '.[] | {path, line, body, user: .user.login, html_url}' 2>/dev/null || echo "(no review comments)"
    echo ""
    echo "===== PR #$n DIFF (capped 80KB) ====="
    gh pr diff "$n" --repo "$REPO" 2>&1 | head -c 80000
  } > "$OUT/pr-$n.txt"
  size=$(wc -c < "$OUT/pr-$n.txt")
  echo "  -> $size bytes"
done

echo "=== DONE ==="
ls -la "$OUT" | tail -30
