import { Module } from '@nestjs/common';
import { MemesModule } from './memes/memes.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config'
import { FilesModule } from './files/files.module'
@Module({
  imports: [
    MemesModule,
    FilesModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
  ],
})
export class AppModule {}
