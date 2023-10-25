import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

// you can add validate using class-validator
export class SingleFileDto{
    @ApiProperty({type:"string",format:"binary"})
    canva:string

    @ApiProperty({
        description: 'Unique identifier of the meme in the database',
        example: '5763cd4dc378a38ecd387737'
    })
    @IsMongoId()
    @IsNotEmpty()
    id:string
}
