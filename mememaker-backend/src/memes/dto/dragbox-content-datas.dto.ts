import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, Min, ValidateNested } from "class-validator";

export class DragboxContentDatasDTO {
    @ApiProperty({
        description: "text inside the dragbox",
        example: 'PRESS THE RIGHT BUTTON'
    })
    @IsString()
    @IsNotEmpty()
    text: string;

    @ApiProperty({
        description: "font size of the text",
        example: 10
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(100)
    fontSize: number;
}