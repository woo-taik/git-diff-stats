export interface AppConfig {
  port: number;
  nodeEnv: string;
}

export interface GitConfig {
  repoPath: string;
}

export interface SupabaseConfig {
  url: string;
  serviceRoleKey: string;
}

export interface LlmConfig {
  provider: 'gemini' | 'anthropic';
  geminiApiKey: string;
  geminiModel: string;
  anthropicApiKey: string;
  anthropicModel: string;
}

export interface Configuration {
  app: AppConfig;
  git: GitConfig;
  supabase: SupabaseConfig;
  llm: LlmConfig;
}

export default (): Configuration => ({
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  git: {
    repoPath: process.env.GIT_REPO_PATH || '',
  },
  supabase: {
    url: process.env.SUPABASE_URL || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  llm: {
    provider: (process.env.LLM_PROVIDER as 'gemini' | 'anthropic') || 'gemini',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    geminiModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
    anthropicModel: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
  },
});
