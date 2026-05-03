# 8기 페이먼츠 1단계 — 반복 안티패턴 요약 (Phase 2 산출물)

분석 대상: 25개 PR (#497~#524, 503/504/508 중복 제외)
분석 일자: 2026-05-03

## 채택할 정식 카드 (5장 + 인덱스 1장)

| ID | 제목 | 빈도 | 대표 PR | q 매핑 |
|---|---|---|---|---|
| **anti-00** | 안티패턴 6선 — 한눈에 보기 (인덱스) | - | - | - |
| **anti-01** | 한 칸의 에러가 다른 칸을 덮어쓴다 | 8+ | #498 #502 #513 #515 #518 #519 #524 | q05 |
| **anti-02** | MasterCard 2-series(2221-2720) 누락 | 11+ | #498 #502 #506 #514 #517 #518 #520 #523 #524 | q06 |
| **anti-03** | `Number()`/`isNaN()` 기반 숫자 검증의 함정 | 6+ | #497 #505 #507 #510 #512 #514 | q07 |
| **anti-04** | 카드 브랜드 — 파생값을 state로 저장 | 5+ | #497 #509 #513 #515 #516 | q02/q06 |
| **anti-05** | 4칸 고정인데 `string[]` — 튜플 누락 | 5+ | #498 #513 #515 #516 #518 #524 | q08 |

## 비주류 (2건 이하 또는 카드화 미채택)

- **state-update / prev 미사용** (4건: #511 #513 #515 #520) — anti-01에 짧게 통합
- **submit preventDefault 누락** (8건+: #500 #501 #505 #512 #513 #515 #517 #521) — anti-01에 짧게 통합  
- **검증 실패값이 state에 반영됨** (3건: #517 #520 #524) — anti-01에 통합
- **brand state useEffect 동기화** (3건: #509 #516 #500) — anti-04에 통합
- **테스트/문서/네이밍** — 패턴이 산발적, 카드 미채택

## 카드 위치

- `content/react-payments/step1/anti-00-overview.mdx`
- `content/react-payments/step1/anti-01-error-overwrite.mdx`
- `content/react-payments/step1/anti-02-mastercard-bin.mdx`
- `content/react-payments/step1/anti-03-number-coercion.mdx`
- `content/react-payments/step1/anti-04-derived-state.mdx`
- `content/react-payments/step1/anti-05-fixed-length-array.mdx`

## _meta.json 갱신 — 사이드바 흐름

```
1단계 홈
8기 페어 고민 → 8장 카드 매핑       (기존 crew-pain-points)
Q1 state는 어디서 관리하나           (기존)
... Q2~Q8
공식문서 단서                          (기존 q09)
[NEW] 8기에서 본 안티패턴 6선         (anti-00)
[NEW] 한 칸 에러가 다른 칸을 덮음     (anti-01)
[NEW] MasterCard 2-series 누락        (anti-02)
[NEW] Number() 숫자 검증의 함정       (anti-03)
[NEW] 카드 브랜드 — 파생값을 state로  (anti-04)
[NEW] 4칸 고정인데 string[]            (anti-05)
부록 — 1단계 PR 전체 인덱스           (기존 q10)
```
