import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Configuration } from '../../common/config/configuration';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private readonly client: SupabaseClient | null = null;

  constructor(private readonly configService: ConfigService<Configuration>) {
    const url = this.configService.get('supabase.url', { infer: true });
    const serviceRoleKey = this.configService.get('supabase.serviceRoleKey', {
      infer: true,
    });

    if (!url || !serviceRoleKey) {
      this.logger.warn(
        'Supabase URL or Service Role Key not configured. Supabase client will not be available.',
      );
      return;
    }

    this.client = createClient(url, serviceRoleKey);
  }

  getClient(): SupabaseClient {
    if (!this.client) {
      throw new Error(
        'Supabase client is not initialized. Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
      );
    }
    return this.client;
  }

  isAvailable(): boolean {
    return this.client !== null;
  }
}
