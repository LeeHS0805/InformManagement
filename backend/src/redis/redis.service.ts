import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  async get(key: any) {
    return this.cacheManager.get(key);
  }

  async add(key: any, val: any, ttl?: number) {
    await this.cacheManager.set(key, val, { ttl: (ttl == undefined) ? null : ttl });
  }
}