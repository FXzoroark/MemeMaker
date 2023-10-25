import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MemeDragboxDatasDTO {
    @ApiProperty({
        description: "The left css property for the position of the dragbox on the meme",
        example: 50
    })
    @IsNumber()
    @IsNotEmpty()
    left: number;

    @ApiProperty({
        description: "The top css property for the position of the dragbox on the meme",
        example: 30
    })
    @IsNumber()
    @IsNotEmpty()
    top: number;

    @ApiProperty({
        description: "The angle of the roation of the dragbox",
        example: 40
    })
    @IsNumber()
    @IsNotEmpty()
    rot: number;

    @ApiProperty({
        description: "The width of the dragbox",
        example: 356
    })
    @IsNumber()
    @IsNotEmpty()
    width: number;

    @ApiProperty({
        description: "The height of the dragbox",
        example: 850
    })
    @IsNumber()
    @IsNotEmpty()
    height: number;

    @ApiProperty({
        description: "The text field inside the dragbox",
        example: 'PRESS THE RIGHT BUTTON'
    })
    @IsString()
    @IsNotEmpty()
    content: string;
}