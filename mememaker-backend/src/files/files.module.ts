import { Module, forwardRef } from "@nestjs/common";
import {FilesController} from "./files.controller"
import { MemesModule } from "src/memes/memes.module";
import { FileService } from "./files.service";
import { UsersModule } from "src/users/users.modules";

@Module({
    controllers: [FilesController],
    providers: [FileService],
    exports: [FileService],
    imports: [forwardRef(() => MemesModule), UsersModule]
  })
  export class FilesModule {}