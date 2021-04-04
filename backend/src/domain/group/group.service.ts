import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";
import { Group, GroupDocument } from "./schema/group.schema";
import { UtilsService } from "../../utils/utils.service";
import { RedisService } from "../../redis/redis.service";

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private readonly groupModel: PaginateModel<GroupDocument>,
              private readonly utils: UtilsService,
              private readonly redis: RedisService) {
  }

  async generateFriendCode(id: number): Promise<string> {
    const queryRes = await this.redis.get(id);
    if (queryRes != undefined) return queryRes["friendCode"];
    const code = this.utils.nextFriendCode();
    await this.redis.add(id, {
      friendCode: code
    }, 259200);
    return code;
  };

  async getMyGroups(stuId: number): Promise<object[]> {
    const data = [];
    const groups = [];
    this.groupModel.find({
      members: { $elemMatch: { $eq: stuId } }
    }).exec((err, data) => {
      if (err) return null;
      return data;
    });
    data.map((value => {
      groups.push({
        groupId: value.groupId,
        name: value.name
      });
    }));
    return groups;
  }
}