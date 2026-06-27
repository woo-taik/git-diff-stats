import { Injectable } from '@nestjs/common';
import { CacheService } from './cache.types';

interface CacheEntry<T> {
  value: T;
  expiresAt: number | null;
}

@Injectable()
export class InMemoryCacheService implements CacheService {
  private readonly cache = new Map<string, CacheEntry<unknown>>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttlSec?: number): Promise<void> {
    const expiresAt = ttlSec ? Date.now() + ttlSec * 1000 : null;
    this.cache.set(key, { value, expiresAt });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}
