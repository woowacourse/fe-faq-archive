# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고하는 안내서입니다.

## 프로젝트 개요

우아한테크코스 프론트엔드 **미션별 PR 아카이브** — 크루의 PR에서 자주 나온 고민과 리뷰어 피드백을 교육용 카드 형태로 정리한 정적 문서 사이트. 한국어 콘텐츠 전용.

## 기술 스택

- **Next.js 16** + **Nextra 4** (docs theme) — MDX 기반 정적 문서 생성
- **Pagefind** — 빌드 후 정적 검색 인덱스 생성 (postbuild에서 자동 실행)
- React 19, ESM (`"type": "module"`)

## 명령어

```bash
npm run dev      # 개발 서버 (next dev)
npm run build    # 빌드 + pagefind 인덱스 생성
npm start        # 프로덕션 서버
```

## 아키텍처

### 콘텐츠 구조 (`content/`)

모든 교육 콘텐츠는 `content/` 디렉토리의 MDX 파일로 관리된다. Nextra가 이 디렉토리를 자동으로 라우팅한다.

```
content/
  _meta.json              ← 미션 목록 (lotto, ...)
  index.mdx               ← 사이트 홈 (미션 선택 페이지)
  {mission}/              ← 미션별 디렉토리 (예: lotto)
    _meta.json            ← 단계 목록
    index.mdx             ← 미션 홈
    step1/
      _meta.json          ← 카드 목록
      index.mdx
      q01-capsule.mdx
      ...
    step2/
      _meta.json
      index.mdx
      a1-model-view.mdx
      ...
```

- 각 `_meta.json`이 해당 레벨의 사이드바 항목 순서와 표시 이름을 결정
- 디렉토리 구조가 곧 URL 구조 (예: `content/lotto/step1/q01-capsule.mdx` → `/lotto/step1/q01-capsule`)

### MDX 카드 형식

각 카드(MDX 파일)는 단계별로 약간 다른 구조를 따른다:

**공통 (모든 카드):**
1. YAML frontmatter (`title`)
2. 크루의 질문/고민 (인용 블록 + PR 링크)
3. AS-IS 코드 (코드 블록, 주석에 파일명 표기)
4. `<Reveal>` 컴포넌트로 감싼 탐색 미션

**선택 섹션 (단계에 따라 포함 여부 결정):**
- 토론 질문 — 코드를 보면서 이야기할 질문
- 리뷰어 피드백 — 리뷰어의 실제 코멘트 인용

### 라우팅

`app/[[...mdxPath]]/page.jsx` — Nextra의 catch-all 라우트. `content/` 디렉토리 구조가 곧 URL 구조.

### 컴포넌트

- `components/Reveal.jsx` — 클라이언트 컴포넌트. 토글 버튼으로 탐색 미션을 숨기거나 보여줌.

### 초안

`_drafts/` — 아직 발행하지 않은 초안 콘텐츠. 빌드에 포함되지 않음.

## 콘텐츠 규칙

- 새 카드 추가 시: `content/{mission}/stepN/`에 MDX 파일 생성 후 해당 `_meta.json`에 항목 추가
- PR 링크는 `https://github.com/woowacourse/javascript-{mission}/pull/번호` 형식
- AS-IS 코드 주석에 원본 파일명을 표기
- 탐색 미션은 반드시 `<Reveal>` 컴포넌트로 감쌈
- Reveal import 경로: 카드 파일 기준 `../../../components/Reveal`

## 커스텀 명령어

- `/콘텐츠추가` — 새 미션/단계/카드를 대화형으로 추가하는 스킬 (`.claude/commands/콘텐츠추가.md`)
