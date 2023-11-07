import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersDao } from './dao/users.dao';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UserEntity } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(private readonly _usersDao: UsersDao) {}

  create = (user: CreateUserDTO): Observable<UserEntity> =>
        this._usersDao.save(user).pipe(
            catchError(
                (e) => throwError(() => new UnprocessableEntityException(e.message)),
            ),
            map((userCreated) => new UserEntity(userCreated)),
        );
}
