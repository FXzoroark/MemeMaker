import { ClassSerializerInterceptor, Logger, Module, forwardRef } from '@nestjs/common';
import { MemesController } from './memes.controller';
import { MemesService } from './memes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Meme, MemeSchema } from './schemas/meme.schema';
import { MemesDao } from './dao/memes.dao';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Meme.name, schema: MemeSchema}]),
    forwardRef(() => FilesModule),
  ],
  controllers: [MemesController],
  providers: [MemesService, Logger, MemesDao],
  exports: [MemesService],
})
export class MemesModule {}
