import { Injectable } from '@nestjs/common';
import { AnalysisService } from '../analysis/analysis.service';
import { LlmService } from '../llm/llm.service';
import { DiffReview } from '../llm/llm.types';

@Injectable()
export class InsightsService {
  constructor(
    private readonly analysisService: AnalysisService,
    private readonly llmService: LlmService,
  ) {}

  // TODO: 특정 커밋에 대한 LLM 인사이트 생성
  async getCommitInsight(hash: string): Promise<{
    summary: string;
    review: DiffReview;
  }> {
    throw new Error('Not implemented');
  }

  // TODO: 기간 내 주요 변경사항 요약
  async getPeriodSummary(opts: { since?: string; until?: string }): Promise<{
    summary: string;
    highlights: string[];
    riskAreas: string[];
  }> {
    throw new Error('Not implemented');
  }

  // TODO: 코드 품질 트렌드 분석
  async getQualityTrend(opts: { since?: string; until?: string }): Promise<{
    trend: 'improving' | 'stable' | 'declining';
    insights: string[];
  }> {
    throw new Error('Not implemented');
  }
}
