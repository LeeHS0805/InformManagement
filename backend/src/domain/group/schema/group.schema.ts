import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type GroupDocument = Group & Document

function de(json, ins) {
  for (const prop in json) {
    if (!json.hasOwnProperty(prop)) continue;
    ins[prop] = json[prop];
  }
}

@Schema()
export class Group {
  constructor(x: number | object) {
    if (typeof x == "string") this.groupId = x;
    else de(x, this);
  }

  @Prop()
  groupId: number;
  @Prop()
  name: string;
  @Prop()
  creator: number;
  @Prop()
  createTime: number;
  @Prop()
  members: number[] = [];

}

export const GroupSchema = SchemaFactory.createForClass(Group);