import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { Configuration } from './common/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<Configuration>);
  const port = configService.get('app.port', { infer: true }) || 3000;

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
