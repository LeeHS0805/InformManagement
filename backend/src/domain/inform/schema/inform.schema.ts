import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type InformDocument = Inform & Document

function de(json, ins) {
  for (const prop in json) {
    if (!json.hasOwnProperty(prop)) {
      if (prop == "createTime") {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        ins[prop] = "${year}-${month}-${day}";
      }
      continue;
    }
    ins[prop] = json[prop];
  }
}

@Schema()
export class Inform {
  constructor(x: object) {
    de(x, this);
  }

  @Prop()
  informId: number;
  @Prop({
    required: true
  })
  title: string;
  @Prop({
    required: true
  })
  creator: number;
  @Prop({
    required: true
  })
  content: string;
  @Prop({
    required: true
  })
  relatedGroupId: number[];
  @Prop({
    required: true
  })
  createTime: string;
  @Prop()
  deadline: Date = null;
  @Prop()
  tag: string[] = [];
  @Prop()
  priority: number = 0;
  @Prop()
  hasRead: number[] = [];

}

export const InformSchema = SchemaFactory.createForClass(Inform);