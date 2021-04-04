import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  constructor(unionId: string) {
    this.wxid = unionId;
  }

  @PrimaryColumn()
  stuId: number;

  @Column()
  real_name: string;

  @Column()
  wxid: string;


}