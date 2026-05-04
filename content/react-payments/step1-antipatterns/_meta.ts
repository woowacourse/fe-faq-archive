import type { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  index: '안티패턴 7선 — 한눈에',
  'anti-01-error-overwrite': 'anti-01. 한 칸 에러가 다른 칸을 덮어쓴다',
  'anti-03-number-coercion': 'anti-03. Number()/isNaN() 검증의 함정',
  'anti-04-derived-state': 'anti-04. 카드 브랜드 — 파생값을 state로',
  'anti-05-fixed-length-array': 'anti-05. 4칸 고정인데 string[]',
  'anti-06-input-separation': 'anti-06. Input 컴포넌트가 입력 종류마다 따로',
  'anti-07-storybook-no-visual-test': 'anti-07. Storybook을 그려놓고 보지 않는다',
  'anti-08-state-lifting': 'anti-08. state 위치 — 이중 상태/통째 lifting',
}

export default meta
