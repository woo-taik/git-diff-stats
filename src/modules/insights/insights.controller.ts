import { Controller, Get, Query, Param } from '@nestjs/common';
import { InsightsService } from './insights.service';

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  // TODO: GET /insights/commit/:hash - 특정 커밋 인사이트 조회
  @Get('commit/:hash')
  async getCommitInsight(@Param('hash') hash: string) {
    throw new Error('Not implemented');
  }

  // TODO: GET /insights/summary - 기간 요약 조회
  @Get('summary')
  async getPeriodSummary(
    @Query('since') since?: string,
    @Query('until') until?: string,
  ) {
    throw new Error('Not implemented');
  }

  // TODO: GET /insights/quality - 코드 품질 트렌드 조회
  @Get('quality')
  async getQualityTrend(
    @Query('since') since?: string,
    @Query('until') until?: string,
  ) {
    throw new Error('Not implemented');
  }
}
