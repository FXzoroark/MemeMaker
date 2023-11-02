import { Module, forwardRef } from "@nestjs/common";
import {FilesController} from "./files.controller"
import { MemesModule } from "src/memes/memes.module";
import { FileService } from "./files.service";

@Module({
    controllers: [FilesController],
    providers: [FileService],
    exports: [FileService],
    imports: [forwardRef(() => MemesModule)]
  })
  export class FilesModule {}