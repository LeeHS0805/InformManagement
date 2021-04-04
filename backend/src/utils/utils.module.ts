import { Module } from "@nestjs/common";
import { UtilsService } from "./utils.service";

@Module({
  imports: [],
  providers: [UtilsService],
  exports: [UtilsService]
})

export class UtilsModule {
}