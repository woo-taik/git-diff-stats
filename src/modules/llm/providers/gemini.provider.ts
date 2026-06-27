import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LlmProvider, CommitSummaryInput, DiffReview } from '../llm.types';
import { Configuration } from '../../../common/config/configuration';

@Injectable()
export class GeminiProvider implements LlmProvider {
  constructor(private readonly configService: ConfigService<Configuration>) {
    // TODO: @google/genai 클라이언트 초기화 (GEMINI_API_KEY / GEMINI_MODEL)
  }

  // TODO: Gemini API를 사용하여 커밋 요약 생성
  async summarizeCommit(input: CommitSummaryInput): Promise<string> {
    throw new Error('Not implemented');
  }

  // TODO: Gemini API를 사용하여 diff 리뷰 생성
  async reviewDiff(input: CommitSummaryInput): Promise<DiffReview> {
    throw new Error('Not implemented');
  }
}
