import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LlmService } from './llm.service';
import { GeminiProvider } from './providers/gemini.provider';
import { AnthropicProvider } from './providers/anthropic.provider';
import { LLM_PROVIDER } from './llm.tokens';
import { llmProviderFactory } from './llm.factory';

@Module({
  providers: [
    GeminiProvider,
    AnthropicProvider,
    {
      provide: LLM_PROVIDER,
      useFactory: llmProviderFactory,
      inject: [ConfigService, GeminiProvider, AnthropicProvider],
    },
    LlmService,
  ],
  exports: [LlmService],
})
export class LlmModule {}
