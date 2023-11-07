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

    @ApiProperty({
        name:"color",
        description: "the rgba representation of a color",
        example: "rgba(0, 0, 0, 1)",
        pattern: "/rgba(\s(-?\d+|-?\d.\d+(?=%))(%?)\s,\s(-?\d+|-?\d.\d+(?=%))(\x02)\s,\s(-?\d+|-?\d.\d+(?=%))(\x02)\s,\s(-?\d+|-?\d.\d+)\s)/"
    })
    @IsString()
    @IsNotEmpty()
    color: string
}