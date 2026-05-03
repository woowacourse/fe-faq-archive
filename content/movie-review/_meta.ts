import type { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  index: '개요',
  '01-error-swallowed': '사라지는 원본 에러',
  '02-error-reflattened': '알림 한 줄로 뭉뚱그려지는 에러',
  '03-listener-break': '재렌더에 휩쓸려 사라지는 이벤트 리스너',
  '04-html-injection': '이스케이프 없이 꽂는 HTML',
  '05-god-handler': '모든 일을 떠맡은 main 함수',
  '06-mode-flag-state': '플래그로 손수 맞추는 모드 전환',
  '07-duplicated-source-of-truth': '여러 곳에 흩어진 상태의 출처',
  '08-duplicated-fetch': '복붙으로 늘어난 fetch 함수',
  '09-render-fetch-mixed': '렌더와 fetch가 뒤섞인 함수',
  '10-fetch-without-ok': 'ok 검사 없이 바로 쓰는 fetch 응답',
  '11-magic-numbers': '이름 없이 흩어진 매직 넘버',
}

export default meta
