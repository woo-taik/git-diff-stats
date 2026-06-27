import { Injectable, Inject } from '@nestjs/common';
import { LLM_PROVIDER } from './llm.tokens';
import type { LlmProvider, CommitSummaryInput, DiffReview } from './llm.types';
import type { CacheService } from '../../infra/cache/cache.types';
import { CACHE_SERVICE } from '../../infra/cache/cache.types';

@Injectable()
export class LlmService {
  constructor(
    @Inject(LLM_PROVIDER) private readonly provider: LlmProvider,
    @Inject(CACHE_SERVICE) private readonly cache: CacheService,
  ) {}

  // TODO: sha256(message + diff + promptVersion) 키로 캐시 조회 → miss 시 provider 호출 → 저장
  async summarizeCommit(input: CommitSummaryInput): Promise<string> {
    throw new Error('Not implemented');
  }

  // TODO: sha256(diff + promptVersion) 키로 캐시 조회 → miss 시 provider 호출 → 저장
  async reviewDiff(input: CommitSummaryInput): Promise<DiffReview> {
    throw new Error('Not implemented');
  }
}
