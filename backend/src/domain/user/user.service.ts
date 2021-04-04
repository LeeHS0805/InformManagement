import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
  }

  async getRole(unionId: string) {
    return this.userRepo.query(`SELECT role_id FROM user_role INNER JOIN users ON wxid = ${unionId}`);
  }

  async getStuId(unionId: string){

  }

  async getGroups(unionId: string) {
    return this.userRepo
  }
}