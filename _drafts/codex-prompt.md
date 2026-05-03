# Codex 프롬프트 — 8기 페이먼츠 1단계 PR 1페이지 분석 노트 생성

너는 우아한테크코스 프론트엔드 코칭 자료를 만드는 분석가다. 아래 `<stdin>`에는 단일 PR의 메타데이터·리뷰 코멘트·diff 일부가 들어있다. 이를 읽고 **정확히 아래 마크다운 템플릿대로** 1페이지 노트를 작성해 stdout에 출력해라. 추가 문장이나 머리말·꼬리말 없이 템플릿만 출력한다.

## 출력 템플릿

```
# PR #{N} {닉네임(이름)} ({state})

- author: {gh_login}
- url: https://github.com/woowacourse/react-payments/pull/{N}
- changedFiles: {X} (+{Y} -{Z})

## 페어 고민 (PR body 핵심 발췌)

- {3~5 bullet, PR 작성자가 직접 쓴 문장 그대로 인용 또는 1문장 요약}

## 핵심 코드 결정/패턴 (실제 diff 발췌)

### 결정 1 — {짧은 제목}
**파일**: `{경로}`
```{lang}
{실제 diff에서 발췌, 5~20줄. 너무 길면 ... 으로 생략. 파일 상단에 `// {경로}` 주석.}
```

(2~4개 결정만 핵심으로 선별. 보일러플레이트 제외.)

## 리뷰어 피드백 (실제 인용)

- @{reviewer} `{path}:{line}`: "{원문 인용, 60자 이내로 핵심만 잘라쓰되 의미 유지}" → {답변 요지(있으면)}

(리뷰 없으면 "(아직 리뷰 없음)" 한 줄)

## 잠재 안티패턴 태그

다음 사전에서만 골라 1줄씩 표기. 각 태그 뒤 콜론 + 30자 이내 사유.

사전:
- [state-shape] : useState 분리/합치기, lifting 위치 부적절
- [state-update] : prev 미사용, mutation, 동기화 effect
- [validation] : onChange 안 alert/throw, 검증 시점 부적절, 폼 단위 검증 누락
- [type-safety] : any, 타입 좁히기 누락, 단언 남용, 빈 인터페이스
- [component-split] : 책임 혼재, props drilling, 합성 부재, 한 컴포넌트 거대화
- [input-handling] : maxLength 미적용, type=number 부작용, 정규식 위치
- [styling] : 인라인 스타일 남용, 매직 넘버, 디자인 토큰 부재
- [naming] : 의미 모호, 한글-영문 혼용 부적절
- [effect] : 불필요한 useEffect, props로 충분한 동기화
- [card-brand] : 식별 로직 위치, 매직 prefix
- [error-handling] : try/catch 남용, 침묵
- [testing] : 테스트 부재 또는 형식적
- [docs] : PR body/주석 부재 또는 과다
- [기타] : 위에 없는 경우 (구체 명기)

태그를 임의로 만들지 말 것. 해당 PR에 실제 신호가 있는 항목만. 0~6개 권장.
```

## 작성 규칙

1. PR body에 한국어로 적힌 페어의 고민/회고 부분에서 인용을 우선한다. 기술 외 인사말·체크리스트 양식은 제외.
2. 코드 발췌는 반드시 diff에 실제로 등장하는 라인만. 만들어내지 마라. 발췌 시 추가/삭제 prefix(+, -)는 제거하고 결과 코드만 표기.
3. 리뷰 코멘트는 path:line 형식 그대로 인용. line 정보가 없으면 path만.
4. 태그는 사전에 없는 새 카테고리 만들지 말 것.
5. 분석은 사실 위주. "X가 좋다/나쁘다" 평가어 금지. 신호 자체만 기록.
6. 출력은 한국어. 코드 식별자는 원문 그대로.
