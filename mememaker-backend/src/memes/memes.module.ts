import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { MemesController } from './memes.controller';
import { MemesService } from './memes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Meme, MemeSchema } from './schemas/meme.schema';
import { MemesDao } from './dao/memes.dao';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Meme.name, schema: MemeSchema}])
  ],
  controllers: [MemesController],
  providers: [MemesService, Logger, MemesDao],
  exports: [MemesService]
})
export class MemesModule {}
