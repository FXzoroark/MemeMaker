import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class DragboxContentDatasEntity {
    @ApiPropertyOptional({
        name:"text",
        description: "The text field inside the dragbox",
        example: 'PRESS THE RIGHT BUTTON'
    })
    @Expose()
    @Type(() => String)
    text: string;

    @ApiProperty({
        name:"fontSize",
        description: "font size of the text",
        example: 10
    })
    @Expose()
    @Type(() => Number)
    fontSize: number;
}