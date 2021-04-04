import { Module } from "@nestjs/common";
import { InformController } from "./inform.controller";
import { AuthorModule } from "../../authorization/author.module";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { Inform, InformSchema } from "./schema/inform.schema";
import { Connection } from "mongoose";
import * as AutoIncrementFactory from "mongoose-sequence";
import * as mongoosePaginate from "mongoose-paginate";
import { InformService } from "./inform.service";
import { GroupModule } from "../group/group.module";

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: Inform.name,
    useFactory: (conn: Connection) => {
      // @ts-ignore
      const AutoIncrement = AutoIncrementFactory(conn);
      const schema = InformSchema;
      // @ts-ignore
      schema.plugin(AutoIncrement, {
        inc_field: "informId",
        start_seq: 1
      }).plugin(mongoosePaginate);
      return schema;
    },
    inject: [getConnectionToken()]
  }]), GroupModule, AuthorModule],
  controllers: [InformController],
  providers: [InformService]
})
export class InformModule {

}