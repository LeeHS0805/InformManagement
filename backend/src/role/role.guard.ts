import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "../domain/user/user.service";
import { Role } from "./role";
import { ROLES_KEY } from "./role.decorator";
import * as crypto from "crypto-js";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector,
              private userService: UserService) {
  }

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!required) return true;
    const token = context.switchToHttp().getRequest().headers["session"];
    if (token == undefined) return false;
    const a = crypto.enc.Base64.parse(token.split(".")[1]);
    const unionId = JSON.parse(a.toString(crypto.enc.Utf8)["unionId"]);

  }

}