import { CacheModule, Module } from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { RedisService } from "./redis.service";

const URL = "49.232.223.89"

@Module({
  imports: [CacheModule.registerAsync({
    useFactory: () => ({
      store: redisStore,
      host: URL,
      port: 50004
    })
  })],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {

}