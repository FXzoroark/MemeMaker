import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema} from './users.schema'
import { UsersDao } from './dao/users.dao';


@Module({
    imports: [
      MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    providers: [UsersService, Logger, UsersDao],
    exports: [UsersService]
  })
  export class UsersModule {}