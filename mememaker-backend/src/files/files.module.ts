import { Module } from "@nestjs/common";
import {FilesController} from "./files.controller"
import { MemesService } from "src/memes/memes.service";
import { MemesModule } from "src/memes/memes.module";
import { UsersModule } from "src/users/users.modules";

@Module({
    controllers: [FilesController],
    imports: [MemesModule, UsersModule]
  })
  export class FilesModule {}