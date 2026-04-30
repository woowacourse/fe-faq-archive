import { Children, isValidElement } from 'react'
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Callout } from './components/Callout'
import { Reveal } from './components/Reveal'

const headingIllustrations = [
  {
    src: '/heading-illustrations/error.png',
    keywords: ['에러', '오류', '경고', '실패', '주의', '404', 'error'],
  },
  {
    src: '/heading-illustrations/review.png',
    keywords: ['리뷰', '피드백', '코멘트', '토론', '대화', '상담', '선배', 'pr', 'feedback', 'review'],
  },
  {
    src: '/heading-illustrations/docs.png',
    keywords: ['공식문서', '문서', '읽을거리', '자료', '부록', '단서', 'docs', 'reference'],
  },
  {
    src: '/heading-illustrations/check.png',
    keywords: ['테스트', '검증', '체크', '확인', '타입', '품질', 'typescript', 'narrowing'],
  },
  {
    src: '/heading-illustrations/code.png',
    keywords: [
      'as-is',
      '코드',
      '구현',
      '리팩터링',
      '컴포넌트',
      '상태',
      '렌더링',
      'hook',
      'effect',
      'jsx',
      'props',
      'state',
    ],
  },
  {
    src: '/heading-illustrations/question.png',
    keywords: ['질문', '고민', '문제', '생각', '진단', '왜', 'pain'],
  },
  {
    src: '/heading-illustrations/learning.png',
    keywords: ['미션', '단계', '학습', '방법', '목차', '카테고리', '개요', '선택', '시작', '데이터'],
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

function getHeadingIllustration(children) {
  const text = Children.toArray(children).map(getNodeText).join(' ').toLowerCase()

  return (
    headingIllustrations.find(({ keywords }) =>
      keywords.some((keyword) => text.includes(keyword.toLowerCase())),
    )?.src ?? '/heading-illustrations/learning.png'
  )
}

function createIllustratedHeading(Component) {
  return function IllustratedHeading({ children, ...props }) {
    const illustration = getHeadingIllustration(children)

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
