import { HttpModule, Module } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { RedisModule } from "../redis/redis.module";
import { UtilsModule } from "../utils/utils.module";
import { JwtStrategy } from "./jwt.strategy";
import { AuthorController } from "./author.controller";
import { UserModule } from "../domain/user/user.module";

@Module({
  imports: [HttpModule, JwtModule.registerAsync({
    useFactory: () => ({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: "2d"
      }
    })
  }), RedisModule, UserModule, UtilsModule],
  controllers: [AuthorController],
  providers: [AuthorService, AuthService, JwtStrategy],
  exports: [AuthorService, AuthService]
})
export class AuthorModule {
}