import { Injectable } from '@nestjs/common';
import { AnalysisService } from '../analysis/analysis.service';
import { InsightsService } from '../insights/insights.service';

export interface DashboardOverview {
  stats: {
    totalCommits: number;
    totalInsertions: number;
    totalDeletions: number;
    activeAuthors: number;
  };
  recentCommits: Array<{
    hash: string;
    message: string;
    author: string;
    date: string;
  }>;
  topAuthors: Array<{
    author: string;
    commits: number;
  }>;
}

@Injectable()
export class DashboardService {
  constructor(
    private readonly analysisService: AnalysisService,
    private readonly insightsService: InsightsService,
  ) {}

  // TODO: 대시보드 메인 화면용 종합 데이터
  async getOverview(opts: {
    since?: string;
    until?: string;
  }): Promise<DashboardOverview> {
    throw new Error('Not implemented');
  }

  // TODO: 대시보드용 상세 통계 + 인사이트 조합
  async getDetailedStats(opts: { since?: string; until?: string }): Promise<{
    commitStats: unknown;
    authorStats: unknown;
    fileStats: unknown;
    timelineStats: unknown;
    insights: unknown;
  }> {
    throw new Error('Not implemented');
  }
}
