import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Observable, from } from "rxjs";

import { User } from '../users.schema';
import { CreateUserDTO } from "../dto/create-user.dto";

@Injectable()
export class UsersDao {

    constructor(
        @InjectModel(User.name)
        private readonly _userModel: Model<User>,
    ) {}

    save = (user: CreateUserDTO): Observable<User> =>
        from(new this._userModel(user).save());
}