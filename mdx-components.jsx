import { Children, isValidElement } from 'react'
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Callout } from './components/Callout'
import { Reveal } from './components/Reveal'

const ILLUSTRATION = {
  check: '/heading-illustrations/check.png',
  code: '/heading-illustrations/code.png',
  docs: '/heading-illustrations/docs.png',
  error: '/heading-illustrations/error.png',
  files: '/heading-illustrations/files.png',
  guide: '/heading-illustrations/guide.png',
  idea: '/heading-illustrations/idea.png',
  improve: '/heading-illustrations/improve.png',
  learning: '/heading-illustrations/learning.png',
  pr: '/heading-illustrations/pr.png',
  question: '/heading-illustrations/question.png',
  reading: '/heading-illustrations/reading.png',
  review: '/heading-illustrations/review.png',
  search: '/heading-illustrations/search.png',
  seniorPrGuide: '/heading-illustrations/senior-pr-guide.png',
}

const headingIllustrationRules = [
  {
    src: ILLUSTRATION.search,
    terms: ['미션 선택', '단계 선택', '그룹 선택', '주제 고르기', '탐색 미션', '학습 흐름'],
  },
  {
    src: ILLUSTRATION.reading,
    terms: ['추가 읽을거리', '원문에서 더 읽을거리', '더 알아볼 개념'],
  },
  {
    src: ILLUSTRATION.pr,
    terms: ['연관 pr'],
  },
  {
    src: ILLUSTRATION.seniorPrGuide,
    terms: ['선배 pr 읽기 가이드'],
  },
  {
    src: ILLUSTRATION.files,
    terms: ['매핑 표', '카테고리별 목차', '분류 표', '카드와 어떻게 연결', '페이먼츠 카드와 어떻게 연결'],
  },
  {
    src: ILLUSTRATION.check,
    terms: ['데이터 개요', '테스트', '검증', '체크', '타입', 'narrowing', '각 state에는', 'choosing the state structure', 'state 구조의 다섯 가지 원칙'],
  },
  {
    src: ILLUSTRATION.guide,
    terms: ['리뷰어의 피드백', '댄 아브라모브', 'kent c. dodds', 'sharing state between components'],
  },
  {
    src: ILLUSTRATION.docs,
    terms: ['공식문서 단서', '이 문서에서 배우게 될 것'],
  },
  {
    src: ILLUSTRATION.question,
    terms: ['크루의 질문', '크루의 고민', '12쌍 페어의 고민', '스스로 진단', '연습 문제', 'reacting to input with state', '그러나', '언제'],
  },
  {
    src: ILLUSTRATION.code,
    terms: ['as-is 코드', '문제 코드', '선언적 ui', 'passing jsx', '페이먼츠 1단계와 연결', '예제로 보는', '5. 너무 깊게', '훅의'],
  },
  {
    src: ILLUSTRATION.error,
    terms: ['에러', '오류', '경고', '실패', '주의', '404', '모순', '2. state가 서로 모순', 'error'],
  },
  {
    src: ILLUSTRATION.improve,
    terms: ['학습 로드맵', '개선 방향', '선언형 사고', '권고', '어떻게 8장', '3. 불필요한 state', 'reusing logic'],
  },
  {
    src: ILLUSTRATION.review,
    terms: ['리뷰', '피드백', '코멘트', '토론', '대화', '상담', '4. 중복된 state', 'feedback', 'review'],
  },
  {
    src: ILLUSTRATION.idea,
    terms: ['한 문장으로 요약하면', '해설', '요약', 'you might not need an effect', 'effect'],
  },
  {
    src: ILLUSTRATION.learning,
    terms: ['들어가며', '학습 방법', '시작', '개요'],
  },
  {
    src: ILLUSTRATION.files,
    terms: ['1. 관련 있는 상태'],
  },
]

function getNodeText(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join(' ')
  }

  if (isValidElement(node)) {
    return getNodeText(node.props.children)
  }

  return ''
}

function normalizeText(value) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim()
}

function getHeadingIllustration(children, props) {
  const text = normalizeText(`${props.id ?? ''} ${Children.toArray(children).map(getNodeText).join(' ')}`)

  return (
    headingIllustrationRules.find(({ terms }) =>
      terms.some((term) => text.includes(normalizeText(term))),
    )?.src ?? ILLUSTRATION.learning
  )
}

function createIllustratedHeading(Component) {
  return function IllustratedHeading({ children, ...props }) {
    const illustration = getHeadingIllustration(children, props)

    return (
      <Component {...props}>
        <span className="heading-illustration" aria-hidden="true">
          <img src={illustration} alt="" loading="lazy" decoding="async" />
        </span>
        <span className="heading-illustration__text">{children}</span>
      </Component>
    )
  }
}

export function useMDXComponents(components) {
  const docsComponents = getDocsMDXComponents(components)

  return {
    ...docsComponents,
    h2: createIllustratedHeading(components?.h2 ?? docsComponents.h2 ?? 'h2'),
    Callout,
    Reveal,
  }
}
