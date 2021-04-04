import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Inform, InformDocument } from "./schema/inform.schema";
import { PaginateModel } from "mongoose";
import { GroupService } from "../group/group.service";

@Injectable()
export class InformService {
  constructor(@InjectModel(Inform.name) private readonly informModel: PaginateModel<InformDocument>,
              private readonly groupService: GroupService) {
  }

  async getAll(page: number = 1): Promise<Object> {
    const opts = {
      page: page,
      limit: 5
    };
    return this.informModel.paginate(this.informModel.find(), opts).then(r => {
      return {
        docs: r.docs,
        nowPage: Number(r.page).valueOf(),
        pageTotal: r.pages,
        itemTotal: r.total
      };
    });
  }

  async getByGroup(groupId: number, page: number = 1): Promise<Object> {
    const opts = {
      page: page,
      limit: 5
    };
    return this.informModel.paginate(this.informModel.find({
      relatedGroupId: { $elemMatch: { $eq: groupId } }
    }), opts).then(r => {
      return {
        docs: r.docs,
        nowPage: Number(r.page).valueOf(),
        pageTotal: r.pages,
        itemTotal: r.total
      };
    });
  }

  async getByInformId(informId: number): Promise<Inform> {
    return this.informModel.findById({
      informId: informId
    });
  }

  async getByDate(date: string): Promise<Object> {
    return this.informModel.find({
      createTime: date
    });
  }

  async getByDateAndGroups(stuId: number, date: string, groups: number[]) {
    const fn = async (groupId, date) => {
      const res = [];
      this.informModel.find({
        relatedGroupId: { $elemMatch: { $eq: groupId } },
        createTime: date
      }).exec((err, data) => {
        if (err) return null;
        return data;
      });
      return res;
    };
    let returnData = [];
    const myGroups = await this.groupService.getMyGroups(stuId);
    myGroups.map(async (value) => {
      const res = await fn(value["groupId"], value["name"]);
      returnData = returnData.concat(res);
    });
    return returnData;
  }

  async insert(inform: Inform): Promise<Inform> {
    return new this.informModel(inform).save().catch(e => {
      throw new BadRequestException();
    });
  }

  async update(inform: Inform): Promise<boolean> {
    const res = await this.informModel.updateOne({
      informId: inform.informId
    }, inform);
    return res.n && res.nModified > 0;
  }

  async delete(id: number) {
    return this.informModel.deleteOne({
      informId: id
    });
  }
}