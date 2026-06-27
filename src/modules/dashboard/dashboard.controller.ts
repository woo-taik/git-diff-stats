import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // TODO: GET /dashboard/overview - 대시보드 메인 데이터
  @Get('overview')
  async getOverview(
    @Query('since') since?: string,
    @Query('until') until?: string,
  ) {
    throw new Error('Not implemented');
  }

  // TODO: GET /dashboard/detailed - 상세 통계 + 인사이트
  @Get('detailed')
  async getDetailedStats(
    @Query('since') since?: string,
    @Query('until') until?: string,
  ) {
    throw new Error('Not implemented');
  }
}
