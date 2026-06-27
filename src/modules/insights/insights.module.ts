import { Module } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { InsightsController } from './insights.controller';
import { AnalysisModule } from '../analysis/analysis.module';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [AnalysisModule, LlmModule],
  controllers: [InsightsController],
  providers: [InsightsService],
  exports: [InsightsService],
})
export class InsightsModule {}
