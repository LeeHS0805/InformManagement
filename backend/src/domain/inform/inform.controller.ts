import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { InformService } from "./inform.service";
import { Inform } from "./schema/inform.schema";

@Controller()
export class InformController {
  constructor(private readonly informService: InformService) {
  }

  @Get("read")
  async read(@Query("informId") informId: number) {
    const inform = await this.informService.getByInformId(informId);
    if (inform.hasRead.includes(0)) return "";
    else {
      inform.hasRead.push(0);
      return await this.informService.update(inform);
    }
  }

  @HttpCode(200)
  @Post("addInform")
  // @UseGuards(JwtAuthGuard)
  async createInform(@Body() body: object) {
    return this.informService.insert(new Inform(body));
  }

  @HttpCode(200)
  @Post("getMyInform")
  async getMyInform(@Body() body: object) {
    const groups = body["groups"];
    return await this.informService.getByGroup(groups);
  }

  @HttpCode(200)
  @Post("getMyInformByDate")
  async getMyInformByDate(@Body() body: object) {
    const date = body["date"];
    return await this.informService.getByDate(date);
  }
}