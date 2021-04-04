import { Controller, Get, Query } from "@nestjs/common";
import { GroupService } from "./group.service";

@Controller()
export class GroupController {
  constructor(private readonly groupService: GroupService) {
  }

  @Get("getFriendCode")
  async getFriendCode(@Query("groupId") groupId: number) {
    return await this.groupService.generateFriendCode(groupId);
  }
}