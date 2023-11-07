import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    username: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    password: string;
}