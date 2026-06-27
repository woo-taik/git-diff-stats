import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AnalysisModule } from '../analysis/analysis.module';
import { InsightsModule } from '../insights/insights.module';

@Module({
  imports: [AnalysisModule, InsightsModule],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
