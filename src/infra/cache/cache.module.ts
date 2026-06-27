import { Module, Global } from '@nestjs/common';
import { InMemoryCacheService } from './cache.service';
import { CACHE_SERVICE } from './cache.types';

@Global()
@Module({
  providers: [
    {
      provide: CACHE_SERVICE,
      useClass: InMemoryCacheService,
    },
  ],
  exports: [CACHE_SERVICE],
})
export class CacheModule {}
