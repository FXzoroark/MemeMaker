import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { User } from "../users.schema";


@Exclude()
export class UserEntity {

    @ApiProperty({
        name: "user_id"
    })
    @Expose()
    @Type(() => Number)
    user_id: number

    @ApiProperty({
        name: "username"
    })
    @Expose()
    @Type(() => String)
    username: string

    @ApiProperty({
        name: "password"
    })
    @Expose()
    @Type(() => String)
    password: string

    constructor(partial: Partial<User>) {
        //this.user_id = partial.user_id;
        this.username = partial.username;
        this.password = partial.password;
    }
}