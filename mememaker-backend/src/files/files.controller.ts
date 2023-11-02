import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { SingleFileDto } from './dto/single-file.dto';
import { FastifyFileInterceptor } from '../interceptors/fastify-file-interceptor';
import { editFileName, imageFileFilter } from './utils/file-upload-util';
import * as fs from "fs"
import { extname } from 'path';
import { MemesService } from 'src/memes/memes.service';

@Controller("files")
@ApiTags('files')
export class FilesController {

    constructor(private readonly _memesService: MemesService){}

    @ApiConsumes('multipart/form-data')
    @Post('upload')
    @UseInterceptors(
      FastifyFileInterceptor('canva', {
        storage: diskStorage({
          destination: './upload/custom',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    upload(@Req() req: Request, @UploadedFile() file: Express.Multer.File, @Body() body: SingleFileDto,) {
        let file_path = `/custom/${body.id}${extname(file.originalname)}`;
        fs.rename(`./upload/custom/${file.originalname.split('.')[0]}${extname(file.originalname)}`, `./upload${file_path}`, () => {})
        this._memesService.updatePath(body.id, file_path).subscribe();
        return { ...body, canva: file_path };
    }
}