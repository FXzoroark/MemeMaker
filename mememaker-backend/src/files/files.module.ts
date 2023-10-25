import { Module } from "@nestjs/common";
import {FilesController} from "./files.controller"
import { MemesService } from "src/memes/memes.service";
import { MemesModule } from "src/memes/memes.module";

@Module({
    controllers: [FilesController],
    imports: [MemesModule]
  })
  export class FilesModule {}