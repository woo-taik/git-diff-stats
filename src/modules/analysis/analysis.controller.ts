import { Controller, Get, Query } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  // TODO: GET /analysis/commits - 커밋 통계 조회
  @Get('commits')
  async getCommitStats(
    @Query('since') since?: string,
    @Query('until') until?: string,
  ) {
    throw new Error('Not implemented');
  }

  // TODO: GET /analysis/authors - 작성자별 통계 조회
  @Get('authors')
  async getAuthorStats(
    @Query('since') since?: string,
    @Query('until') until?: string,
  ) {
    throw new Error('Not implemented');
  }

  // TODO: GET /analysis/files - 파일별 통계 조회
  @Get('files')
  async getFileStats(
    @Query('since') since?: string,
    @Query('until') until?: string,
  ) {
    throw new Error('Not implemented');
  }

  // TODO: GET /analysis/timeline - 시간대별 통계 조회
  @Get('timeline')
  async getTimelineStats(
    @Query('since') since?: string,
    @Query('until') until?: string,
    @Query('groupBy') groupBy: 'hour' | 'day' | 'week' | 'month' = 'day',
  ) {
    throw new Error('Not implemented');
  }
}
