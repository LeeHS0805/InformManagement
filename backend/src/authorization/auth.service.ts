import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthorService } from "./author.service";
import { RedisService } from "../redis/redis.service";
import { UtilsService } from "../utils/utils.service";
import { UserService } from "../domain/user/user.service";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
              private authorService: AuthorService,
              private redisService: RedisService,
              private userService: UserService,
              private readonly utils: UtilsService) {
  }

  async login(jsCode: string) {
    const response = await this.authorService.requestWx(jsCode);
    const data = response.data;
    const sessionKey = data["session_key"];
    const openId = data["openid"];
    const unionId = data["unionid"]; // 区分每个微信用户，与数据库的学号进行绑定
    if (sessionKey == undefined || openId == undefined) return new BadRequestException("服务端请求错误，请过一会重试。");
    const thirdKey = await this.utils.nextKey();
    const stuId = await this.userService;
    const val = {
      sessionKey: sessionKey,
      openId: openId,
      unionId: unionId
    };
    const payload = {
      sub: thirdKey,
      stuId: stuId
    };
    const token = this.jwtService.sign(payload);
    await this.redisService.add(thirdKey, val, 173000);
    return {
      session: token
    };
  }
}