import { Injectable } from "@nestjs/common";

@Injectable()
export class UtilsService {

  async nextKey(): Promise<string> {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let id = [], i;
    let radix = chars.length;
    for (i = 0; i < 168; ++i) id[i] = chars[0 | Math.random() * radix];
    return id.join("");
  }

  async nextFriendCode(): Promise<string> {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
    let code = [], i;
    let radix = chars.length;
    for (i = 0; i < 6; ++i) code[i] = chars[0 | Math.random() * radix];
    return code.join("");
  }
}
