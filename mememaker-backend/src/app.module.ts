import { Logger, Module } from '@nestjs/common';
import { MemesModule } from './memes/memes.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config'
import { FilesModule } from './files/files.module'
import { UserSchema } from './users/users.schema';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.modules';
import { UsersDao } from './users/dao/users.dao';
@Module({
  imports: [
    MemesModule,
    UsersModule,
    FilesModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersDao, Logger],
})
export class AppModule {}
