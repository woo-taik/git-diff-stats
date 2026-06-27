import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LlmProvider, CommitSummaryInput, DiffReview } from '../llm.types';
import { Configuration } from '../../../common/config/configuration';

@Injectable()
export class AnthropicProvider implements LlmProvider {
  constructor(private readonly configService: ConfigService<Configuration>) {
    // TODO: @anthropic-ai/sdk 클라이언트 초기화 (ANTHROPIC_API_KEY / ANTHROPIC_MODEL)
  }

  // TODO: Anthropic API를 사용하여 커밋 요약 생성
  async summarizeCommit(input: CommitSummaryInput): Promise<string> {
    throw new Error('Not implemented');
  }

  // TODO: Anthropic API를 사용하여 diff 리뷰 생성
  async reviewDiff(input: CommitSummaryInput): Promise<DiffReview> {
    throw new Error('Not implemented');
  }
}
