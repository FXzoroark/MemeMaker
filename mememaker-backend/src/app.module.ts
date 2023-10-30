import { Module } from '@nestjs/common';
import { MemesModule } from './memes/memes.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config'
import { FilesModule } from './files/files.module'
import { UserSchema } from './user/user.model';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
@Module({
  imports: [
    MemesModule,
    FilesModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
