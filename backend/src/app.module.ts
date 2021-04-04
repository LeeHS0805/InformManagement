import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { AuthorModule } from "./authorization/author.module";
import { InformModule } from "./domain/inform/inform.module";
import { RedisModule } from "./redis/redis.module";
import { UtilsModule } from "./utils/utils.module";
import { ResponseInterceptor } from "./interceptor/response.interceptor";
import { ErrorFilter, RuntimeErrorFilter } from "./interceptor/error.filter";

const URL = "49.232.223.89";

@Module({
  imports: [MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: `mongodb://${URL}:50006/database`
    })
  }), TypeOrmModule.forRootAsync(({
    useFactory: () => ({
      type: "mysql",
      host: URL,
      port: 50005,
      username: "root",
      password: "123456",
      database: "inform",
      autoLoadEntities: true,
      synchronize: true
    })
  })), AuthorModule, InformModule, RedisModule, UtilsModule],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor
  }, {
    provide: APP_FILTER,
    useClass: ErrorFilter
  }, {
    provide: APP_FILTER,
    useClass: RuntimeErrorFilter
  }]
})
export class AppModule {
}
