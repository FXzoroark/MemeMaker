import { Module } from '@nestjs/common';
import { MemesModule } from './memes/memes.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config'
import { FilesModule } from './files/files.module'
import { UserSchema } from './users/users.model';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
@Module({
  imports: [
    MemesModule,
    FilesModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
