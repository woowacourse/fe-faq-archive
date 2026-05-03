import type { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  index: '1단계 홈',
  'crew-pain-points': '8기 페어 고민 → 8장 카드 매핑',
  'q01-state-location': 'Q1. state는 어디서 관리하나',
  'q02-state-shape': 'Q2. state 구조 — 묶을까 나눌까',
  'q03-card-number-split': 'Q3. 카드번호 4영역 — 분할 vs 단일',
  'q04-fieldset-composition': 'Q4. 공통 Input 컴포넌트 — 합성',
  'q05-validation-error': 'Q5. 검증과 에러 책임',
  'q06-card-brand-domain': 'Q6. 카드 브랜드 — 폼 vs 도메인',
  'q07-input-constraints': 'Q7. input 제약 — maxLength vs type=number',
  'q08-typescript-narrowing': 'Q8. TypeScript 타입 좁히기 — never 회피',
  'q09-official-docs-ko': {
    type: 'doc',
    title: '공식문서 단서 — 한글 번역',
  },
  antipatterns: {
    type: 'doc',
    title: '안티패턴 — 8기 PR에서 본 6선',
  },
  'q10-appendix-all-prs': '부록 — 1단계 PR 전체 인덱스',
}

export default meta
