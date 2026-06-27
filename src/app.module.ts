import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './common/config/configuration';

import { CacheModule } from './infra/cache/cache.module';
import { SupabaseModule } from './infra/supabase/supabase.module';
import { PersistenceModule } from './infra/persistence/persistence.module';

import { GitModule } from './modules/git/git.module';
import { AnalysisModule } from './modules/analysis/analysis.module';
import { LlmModule } from './modules/llm/llm.module';
import { InsightsModule } from './modules/insights/insights.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule,
    SupabaseModule,
    PersistenceModule,
    GitModule,
    AnalysisModule,
    LlmModule,
    InsightsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
