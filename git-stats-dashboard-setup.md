# Git Stats Dashboard — 초기 셋팅 프롬프트

> Claude Code / Cursor 등 코딩 에이전트에 그대로 붙여넣고 시작하기 위한 셋업 지시서.
> **초기 스캐폴딩까지만** 진행하고, 도메인 로직(파싱/집계/LLM 연동)은 직접 구현한다.

---

## 0. 프로젝트 개요

git commit message와 diff를 분석해 통계 + LLM 인사이트를 제공하는 대시보드의 **백엔드(NestJS)**.

- **목적**: git log/diff 추출 → 통계 집계 → LLM 요약/분류 → 대시보드 API 제공
- **DB**: Supabase (Postgres)
- **LLM**: 멀티 프로바이더 추상화 (Gemini / Anthropic / OpenAI 교체 가능). 기본 프로바이더는 **Gemini 2.5 Flash** (비용·무료티어 유리)
- **패키지 매니저**: pnpm
- **언어**: TypeScript (strict)

---

## 1. 해줬으면 하는 것 (초기 셋팅 범위)

아래까지만 진행하고, 각 service의 **메서드 시그니처 + 빈 구현 + TODO 주석**만 남겨둘 것. 실제 로직은 직접 채운다.

1. NestJS 프로젝트 스캐폴딩 (pnpm)
2. 아래 폴더 구조 + 빈 모듈/서비스/컨트롤러 파일 생성
3. 공유 타입 정의 (`common/types`)
4. 설정 모듈 (`@nestjs/config`) + `.env.example`
5. Supabase 클라이언트 provider 셋업
6. LLM 멀티 프로바이더 추상화: `LlmProvider` 인터페이스 + Gemini/Anthropic provider 클래스 (둘 다 호출은 빈 메서드), env 기반 프로바이더 선택 factory
7. 캐시 서비스 인터페이스 + in-memory 기본 구현
8. eslint/prettier, tsconfig strict, 기본 health check 엔드포인트

> **하지 말 것**: git 파싱 로직, 집계 알고리즘, 프롬프트 내용, 실제 LLM 호출 구현. 전부 빈 메서드 + `// TODO:` 주석으로 남길 것.

---

## 2. 폴더 구조

```
src/
├── main.ts
├── app.module.ts
│
├── common/
│   ├── config/
│   │   └── configuration.ts
│   ├── decorators/
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── interceptors/
│   └── types/
│       ├── commit.types.ts      # CommitStat, CommitMeta
│       ├── diff.types.ts        # DiffStat, FileChange, Hunk
│       └── index.ts
│
├── modules/
│   ├── git/
│   │   ├── git.module.ts
│   │   ├── git.service.ts        # git log/diff 실행 + raw 추출
│   │   ├── git.controller.ts
│   │   ├── parsers/
│   │   │   ├── log.parser.ts     # 순수 함수 (raw → CommitMeta[])
│   │   │   └── diff.parser.ts    # 순수 함수 (raw → FileChange[])
│   │   └── dto/
│   │
│   ├── analysis/
│   │   ├── analysis.module.ts
│   │   ├── analysis.service.ts
│   │   ├── analysis.controller.ts
│   │   └── aggregators/
│   │       ├── author.aggregator.ts
│   │       ├── timeline.aggregator.ts
│   │       └── file.aggregator.ts
│   │
│   ├── llm/
│   │   ├── llm.module.ts
│   │   ├── llm.service.ts        # 파사드: provider 주입받아 위임 + 캐싱 연동
│   │   ├── llm.types.ts          # LlmProvider 인터페이스, 공용 입출력 타입
│   │   ├── llm.tokens.ts         # DI 토큰 (LLM_PROVIDER)
│   │   ├── llm.factory.ts        # env 기반 provider 선택
│   │   ├── providers/
│   │   │   ├── gemini.provider.ts   # @google/genai 래핑 (빈 구현)
│   │   │   └── anthropic.provider.ts# @anthropic-ai/sdk 래핑 (빈 구현)
│   │   ├── prompts/
│   │   │   ├── commit-summary.prompt.ts
│   │   │   └── diff-review.prompt.ts
│   │   └── dto/
│   │
│   ├── insights/
│   │   ├── insights.module.ts
│   │   ├── insights.service.ts
│   │   └── insights.controller.ts
│   │
│   └── dashboard/
│       ├── dashboard.module.ts
│       ├── dashboard.service.ts
│       └── dashboard.controller.ts
│
└── infra/
    ├── supabase/
    │   ├── supabase.module.ts
    │   └── supabase.service.ts   # createClient provider
    ├── cache/
    │   ├── cache.module.ts
    │   ├── cache.service.ts      # 인터페이스 + in-memory 구현
    │   └── cache.types.ts
    └── persistence/
        ├── persistence.module.ts
        └── repositories/         # Supabase 쿼리 래퍼 (빈 메서드)
```

---

## 3. 의존 방향 (반드시 단방향 유지)

```
git → analysis → insights → dashboard
                    ↓
                   llm
```

- `git`은 아무것도 모름 (순수 추출 + 파싱)
- `analysis`는 `git`만 의존
- `insights`는 `analysis` + `llm` 조합 (단, `LlmService` 파사드까지만 의존 — provider 구현은 모름)
- `dashboard`는 BFF 성격, 위 모듈 결과를 조립해 프론트 응답 생성
- `infra/*`는 어디서든 주입 가능 (역방향 의존 금지)
- LLM 프로바이더 교체는 `LLM_PROVIDER` env 한 줄 변경으로만 (도메인 코드 무수정)

파서(`parsers/*`)는 **순수 함수**로. NestJS 데코레이터 없이 export function 형태, side effect 없게.

---

## 4. 환경변수 (`.env.example`)

```env
# App
PORT=3000
NODE_ENV=development

# Git
GIT_REPO_PATH=/absolute/path/to/target/repo

# Supabase
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# LLM
LLM_PROVIDER=gemini            # gemini | anthropic

# Gemini (기본)
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash

# Anthropic (선택)
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-4-6
```

`configuration.ts`는 위 값을 타입 세이프하게 노출. `ConfigModule.forRoot({ isGlobal: true })` 적용.

---

## 5. 공유 타입 초안 (`common/types`)

채워도 되는 기본 형태. 필드는 개발하며 늘릴 것.

```ts
// commit.types.ts
export interface CommitMeta {
  hash: string;
  author: string;
  email: string;
  date: string;        // ISO
  message: string;
  insertions: number;
  deletions: number;
  filesChanged: number;
}

// diff.types.ts
export interface FileChange {
  path: string;
  status: 'added' | 'modified' | 'deleted' | 'renamed';
  insertions: number;
  deletions: number;
  hunks: Hunk[];
}

export interface Hunk {
  header: string;
  lines: string[];
}
```

---

## 6. 캐시 서비스 (LLM 결과 캐싱용)

`infra/cache`에 인터페이스 + in-memory 기본 구현.
키 규칙: `sha256(diff 또는 commit hash + prompt 버전)`. **인터페이스만 맞춰두고 나중에 Redis로 교체 가능하게** 추상화.

```ts
export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSec?: number): Promise<void>;
}
```

---

## 6-1. LLM 멀티 프로바이더 설계 (핵심)

도메인 코드(`insights` 등)는 **구체 프로바이더를 절대 모르게** 한다. `LlmProvider` 인터페이스에만 의존.

**DI 구성:**
- `LLM_PROVIDER` 토큰(`llm.tokens.ts`)으로 인터페이스 주입
- `llm.factory.ts`가 `LLM_PROVIDER` env 값을 보고 `GeminiProvider` 또는 `AnthropicProvider` 인스턴스를 useFactory로 제공
- `LlmService`는 파사드 — provider 위임 + 캐싱만 담당, 프로바이더 분기 로직 없음

```ts
// llm.module.ts (개념)
{
  provide: LLM_PROVIDER,
  useFactory: (config: ConfigService, gemini: GeminiProvider, anthropic: AnthropicProvider) =>
    config.get('LLM_PROVIDER') === 'anthropic' ? anthropic : gemini,
  inject: [ConfigService, GeminiProvider, AnthropicProvider],
}
```

**원칙:**
- 입출력 타입(`CommitSummaryInput`, `DiffReview`)은 프로바이더 무관한 도메인 타입. SDK 응답 형태를 그대로 노출하지 말 것.
- 프롬프트는 프로바이더 공용. provider는 "프롬프트 받아 텍스트/JSON 반환"만 책임.
- 기본은 Gemini 2.5 Flash. 나중에 특정 작업만 다른 프로바이더로 라우팅하고 싶으면 factory를 작업별 분기로 확장 (지금은 단순 env 선택만).

---

## 7. Supabase 셋업

- `@supabase/supabase-js`로 `createClient` provider 생성
- `SUPABASE_SERVICE_ROLE_KEY` 사용 (서버 사이드)
- `persistence/repositories`는 Supabase 쿼리를 래핑하는 빈 메서드만. 테이블 스키마는 직접 설계할 거라 마이그레이션/스키마 생성은 하지 말 것.

---

## 8. 빈 구현 예시 (이런 식으로 남겨둘 것)

```ts
// git.service.ts
@Injectable()
export class GitService {
  constructor(private readonly config: ConfigService) {}

  // TODO: git log --numstat --pretty=format:... 실행 후 raw 반환
  async getRawLog(opts: { since?: string; until?: string }): Promise<string> {
    throw new Error('Not implemented');
  }

  // TODO: git diff / git show 로 특정 커밋 diff raw 반환
  async getRawDiff(hash: string): Promise<string> {
    throw new Error('Not implemented');
  }
}
```

```ts
// llm.types.ts — provider 무관 인터페이스
export interface CommitSummaryInput {
  message: string;
  diff: string;
}

export interface DiffReview {
  summary: string;
  risk: 'low' | 'medium' | 'high';
  tags: string[];
}

export interface LlmProvider {
  summarizeCommit(input: CommitSummaryInput): Promise<string>;
  reviewDiff(input: CommitSummaryInput): Promise<DiffReview>;
}
```

```ts
// providers/gemini.provider.ts — 빈 구현
@Injectable()
export class GeminiProvider implements LlmProvider {
  // TODO: @google/genai 클라이언트 주입 (GEMINI_API_KEY / GEMINI_MODEL)
  async summarizeCommit(input: CommitSummaryInput): Promise<string> {
    throw new Error('Not implemented');
  }
  async reviewDiff(input: CommitSummaryInput): Promise<DiffReview> {
    throw new Error('Not implemented');
  }
}
// anthropic.provider.ts 도 동일한 인터페이스로 빈 구현
```

```ts
// llm.service.ts — 파사드. provider 교체에 영향 안 받음 + 캐싱 책임
@Injectable()
export class LlmService {
  constructor(
    @Inject(LLM_PROVIDER) private readonly provider: LlmProvider,
    private readonly cache: CacheService,
  ) {}

  // TODO: sha256(diff + promptVersion) 키로 캐시 조회 → miss 시 provider 호출 → 저장
  async reviewDiff(input: CommitSummaryInput): Promise<DiffReview> {
    throw new Error('Not implemented');
  }
}
```

---

## 9. 마지막 확인사항

- TypeScript `strict: true`, `noUncheckedIndexedAccess: true`
- 모든 모듈 `app.module.ts`에 등록
- `GET /health` 동작 확인
- `pnpm start:dev` 정상 기동까지 확인 후 마무리

위 범위까지만. 도메인 로직은 비워두고 TODO로 표시할 것.
