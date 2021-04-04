import { BadRequestException, Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller()
export class AuthorController {
  constructor(private readonly authService: AuthService) {
  }

  @HttpCode(200)
  @Post("login")
  async login(@Body() body: object) {
    const code = body["js_code"];
    if (code == undefined) return new BadRequestException();
    return await this.authService.login(code);
  }

  @Get("test")
  @UseGuards(JwtAuthGuard)
  async test() {
    return "OK~";
  }

}