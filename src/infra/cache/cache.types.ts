export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSec?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

export const CACHE_SERVICE = Symbol('CACHE_SERVICE');
