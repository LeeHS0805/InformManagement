import { Module } from "@nestjs/common";
import { UtilsModule } from "../../utils/utils.module";
import { RedisModule } from "../../redis/redis.module";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import * as AutoIncrementFactory from "mongoose-sequence";
import * as mongoosePaginate from "mongoose-paginate";
import { Group, GroupSchema } from "./schema/group.schema";

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: Group.name,
    useFactory: (conn: Connection) => {
      // @ts-ignore
      const AutoIncrement = AutoIncrementFactory(conn);
      const schema = GroupSchema;
      // @ts-ignore
      schema.plugin(AutoIncrement, {
        inc_field: "groupId",
        start_seq: 1
      }).plugin(mongoosePaginate);
      return schema;
    },
    inject: [getConnectionToken()]
  }]), UtilsModule, RedisModule],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService]
})
export class GroupModule {

}