# 설계: 콘텐츠 구조 개편 + `/콘텐츠추가` 스킬 + CLAUDE.md + README.md

**날짜:** 2026-04-01
**상태:** 승인됨

---

## 1. 개요

이 프로젝트는 네 가지 작업으로 구성된다:

1. **콘텐츠 구조 개편** — 다중 미션 지원을 위해 `content/step1/` → `content/lotto/step1/` 마이그레이션
2. **CLAUDE.md 한국어 재작성** — 새 구조 반영 + 한국어로 작성
3. **README.md 작성** — 프로젝트 소개 + 로컬 실행 + `/콘텐츠추가` 사용법 안내
4. **`/콘텐츠추가` 스킬 생성** — 코치가 대화형으로 새 미션/단계/카드를 추가할 수 있는 Claude Code 스킬

### 대상 사용자

코치/교육 담당자. 새로운 미션이나 단계를 추가하는 역할.

### 사이트 이름 변경

"로또 FAQ 카드" / "로또 PR 아카이브" → **"우테코 FE 미션 아카이브"**

---

## 2. 콘텐츠 구조 개편

### 2.1 현재 구조 (Before)

```
content/
  _meta.json          ← step1, step2만 나열
  index.mdx
  step1/
    _meta.json
    index.mdx
    q01-capsule.mdx
    ...
  step2/
    _meta.json
    index.mdx
    a1-model-view.mdx
    ...
```

### 2.2 새 구조 (After)

```
content/
  _meta.json          ← 미션 목록 (lotto, movie-review...)
  index.mdx           ← 사이트 홈 (미션 선택 페이지)
  lotto/
    _meta.json        ← step1, step2 나열
    index.mdx         ← 로또 미션 홈
    step1/
      _meta.json
      index.mdx
      q01-capsule.mdx
      ...
    step2/
      _meta.json
      index.mdx
      a1-model-view.mdx
      ...
```

### 2.3 마이그레이션 작업

1. `content/lotto/` 디렉토리 생성
2. `content/step1/`, `content/step2/` → `content/lotto/step1/`, `content/lotto/step2/` 이동
3. `content/lotto/_meta.json` 생성 (기존 `content/_meta.json`의 step1, step2 항목 이동)
4. `content/lotto/index.mdx` 생성 (기존 `content/index.mdx`의 단계 선택 내용 이동)
5. `content/_meta.json` 수정 — 미션 목록으로 변경
6. `content/index.mdx` 수정 — 미션 선택 페이지로 변경
7. MDX 파일 내 `import { Reveal }` 경로 수정 (`../../` → `../../../`)
8. `app/layout.jsx`, `theme.config.jsx` 의 사이트 이름 변경

### 2.4 URL 변경

| Before | After |
|--------|-------|
| `/step1/q01-capsule` | `/lotto/step1/q01-capsule` |
| `/step2/a1-model-view` | `/lotto/step2/a1-model-view` |

---

## 3. `/콘텐츠추가` 스킬 설계

### 3.1 전체 흐름

```
/콘텐츠추가
  → "어떤 작업을 하시겠습니까?"
     ├─ A) 기존 미션의 기존 단계에 카드 추가
     │    → 미션 선택 (content/ 하위 디렉토리 자동 탐색)
     │    → 단계 선택
     │    → 카드 섹션 선택 (체크리스트)
     │    → PR 링크 입력 또는 대화형 인터뷰
     │    → MDX 파일 생성 + _meta.json 업데이트
     │
     ├─ B) 기존 미션에 새 단계 생성
     │    → 미션 선택
     │    → 단계 이름/폴더명 입력
     │    → _meta.json, index.mdx 생성
     │    → "이어서 카드를 추가하시겠습니까?" → A 흐름으로 연결
     │
     └─ C) 새 미션 생성
          → 미션 이름/폴더명 입력 (예: movie-review)
          → content/_meta.json에 추가
          → 미션 디렉토리 + index.mdx + _meta.json 생성
          → "이어서 단계를 추가하시겠습니까?" → B 흐름으로 연결
```

### 3.2 카드 섹션 선택

카드 추가 시 코치에게 포함할 섹션을 체크리스트로 보여준다:

| 섹션 | 기본 포함 | 설명 |
|------|-----------|------|
| 크루의 질문/고민 | O | 인용 블록 + PR 링크 |
| AS-IS 코드 | O | 코드 블록, 주석에 파일명 표기 |
| 토론 질문 | X | 코드를 보면서 이야기할 질문 |
| 리뷰어 피드백 | X | 리뷰어의 실제 코멘트 인용 |
| 탐색 미션 | O | `<Reveal>` 컴포넌트로 감쌈 |

- 기본 포함 3개(질문, AS-IS 코드, 탐색 미션)는 모든 카드의 공통 뼈대
- 토론 질문 + 리뷰어 피드백을 모두 선택하면 현재 2단계 형식
- 둘 다 빼면 현재 1단계 형식

### 3.3 PR 자동 수집

```
"PR 링크가 있으시면 입력해주세요 (없으면 엔터):"
  ├─ PR 링크 입력됨
  │    → gh api로 PR 정보 조회 (제목, 작성자, 리뷰 코멘트)
  │    → 리뷰 코멘트 중 주요 피드백을 추출하여 초안 생성
  │    → 코치에게 초안을 보여주고 수정 확인
  │
  └─ 엔터 (링크 없음)
       → 대화형 인터뷰로 각 섹션 내용을 순서대로 입력받음
```

- `gh api repos/{owner}/{repo}/pulls/{number}/comments` 사용
- 자동 수집된 내용은 초안이므로 코치가 반드시 확인/수정 후 확정
- 하나의 카드에 여러 PR을 참조할 수 있으므로 "PR을 더 추가하시겠습니까?"로 반복 가능

### 3.4 파일 생성 규칙

#### 새 미션 생성 시
1. `content/{mission}/` 디렉토리 생성
2. `content/{mission}/_meta.json` 생성 (index 항목만 포함)
3. `content/{mission}/index.mdx` 생성 (미션 홈 페이지)
4. `content/_meta.json`에 새 미션 항목 추가

#### 새 단계 생성 시
1. `content/{mission}/stepN/` 디렉토리 생성
2. `content/{mission}/stepN/_meta.json` 생성 (index 항목만 포함)
3. `content/{mission}/stepN/index.mdx` 생성 (단계 홈 페이지)
4. `content/{mission}/_meta.json`에 새 단계 항목 추가

#### 카드 추가 시
1. `content/{mission}/stepN/` 에 MDX 파일 생성
   - 파일명: 코치가 입력한 ID (예: `q12-new-topic.mdx`)
2. `content/{mission}/stepN/_meta.json`에 항목 추가
3. MDX 파일 내용은 선택된 섹션에 따라 템플릿 조합

### 3.5 MDX 템플릿 구조

선택된 섹션에 따라 아래 블록을 조합하여 생성:

```mdx
---
title: '{코치가 입력한 제목}'
---

import { Reveal } from '../../../components/Reveal'

# {카드 제목}

{읽기 가이드 — 토론 질문+리뷰어 피드백 포함 시에만}

## 크루의 질문/고민

> "{질문 내용}" — {크루 이름}, [PR #{번호}]({PR 링크})

{토론 질문 섹션 — 선택 시에만}
### 이 코드를 보면서 이야기해봅시다
- "{질문1}"
- "{질문2}"

## AS-IS 코드

> 출처: [PR #{번호} — {크루 이름}]({PR 링크}) · [해당 파일]({파일 링크})

```{언어}
// {파일명}
{코드}
```

{리뷰어 피드백 섹션 — 선택 시에만}
## 리뷰어의 피드백
> "{피드백 내용}" — PR #{번호} ([링크]({PR 링크}))

---

<Reveal>

## 탐색 미션

### PR #{번호} — {크루 이름}
[PR 링크]({PR 링크})

**찾아볼 것:** "{탐색 과제}"

</Reveal>
```

---

## 4. CLAUDE.md 한국어 재작성

새 구조를 반영하여 한국어로 작성. 주요 변경점:
- 콘텐츠 구조 설명을 `content/{mission}/stepN/` 기준으로 변경
- 사이트 이름을 "우테코 FE 미션 아카이브"로 변경
- 새 카드 추가 규칙을 미션/단계 경로 기준으로 변경

---

## 5. README.md

```markdown
# 우테코 FE 미션 아카이브

우아한테크코스 프론트엔드 미션에서 크루의 PR 고민과
리뷰어 피드백을 교육용 카드로 정리한 사이트입니다.

## 시작하기

npm install
npm run dev

## 콘텐츠 추가하기

Claude Code에서 `/콘텐츠추가` 명령으로 콘텐츠를 추가할 수 있습니다.

- 새 미션 생성, 새 단계 생성, 기존 단계에 카드 추가 모두 지원
- PR 링크를 입력하면 리뷰 코멘트를 자동 수집하여 초안 생성
- 대화형 인터뷰로 직접 내용을 입력할 수도 있습니다

## 배포

npm run build
```

---

## 6. 구현 범위

| 순서 | 작업 | 파일 |
|------|------|------|
| 1 | 콘텐츠 구조 개편 | `content/` 전체 재구성 |
| 2 | 사이트 이름 변경 | `app/layout.jsx`, `theme.config.jsx` |
| 3 | CLAUDE.md 한국어 재작성 | `CLAUDE.md` |
| 4 | README.md 작성 | `README.md` |
| 5 | `/콘텐츠추가` 스킬 생성 | `.claude/commands/콘텐츠추가.md` |

### 스킬 구현 방식

Claude Code의 커스텀 슬래시 커맨드(`.claude/commands/` 디렉토리의 마크다운 파일)로 구현한다. 별도의 코드나 스크립트 없이 프롬프트 기반으로 동작하며, Claude Code가 대화형으로 코치에게 질문하고 도구(Read, Write, Edit, Bash)를 사용하여 파일을 생성/수정한다. 이 파일은 git에 커밋하여 저장소를 클론한 모든 팀원이 사용할 수 있도록 한다.
