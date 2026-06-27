import { ConfigService } from '@nestjs/config';
import { GeminiProvider } from './providers/gemini.provider';
import { AnthropicProvider } from './providers/anthropic.provider';
import { LlmProvider } from './llm.types';
import { Configuration } from '../../common/config/configuration';

export const llmProviderFactory = (
  configService: ConfigService<Configuration>,
  geminiProvider: GeminiProvider,
  anthropicProvider: AnthropicProvider,
): LlmProvider => {
  const provider = configService.get('llm.provider', { infer: true });

  if (provider === 'anthropic') {
    return anthropicProvider;
  }

  return geminiProvider;
};
