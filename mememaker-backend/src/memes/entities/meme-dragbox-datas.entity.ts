import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class MemeDragboxDatasEntity {

    @ApiProperty({
        name:"id",
        description: 'Unique identifier in the database',
        example: '5763cd4dc378a38ecd387737'
    })
    @Expose()
    @Type(() => String)
    _id: string;

    @ApiProperty({
        name:"left",
        description: "The left css property for the position of the dragbox on the meme",
        example: 50
    })
    @Expose()
    @Type(() => Number)
    left: number;

    @ApiProperty({
        name:"top",
        description: "The top css property for the position of the dragbox on the meme",
        example: 30
    })
    @Expose()
    @Type(() => Number)
    top: number;

    @ApiProperty({
        name:"rot",
        description: "The angle of the roation of the dragbox",
        example: 40
    })
    @Expose()
    @Type(() => Number)
    rot: number;

    @ApiProperty({
        name:"width",
        description: "The width of the dragbox",
        example: 356
    })
    @Expose()
    @Type(() => Number)
    width: number;

    @ApiProperty({
        name:"height",
        description: "The height of the dragbox",
        example: 850
    })
    @Expose()
    @Type(() => Number)
    height: number;

    @ApiPropertyOptional({
        name:"content",
        description: "The text field inside the dragbox",
        example: 'PRESS THE RIGHT BUTTON'
    })
    @Expose()
    @Type(() => String)
    content?: string;
}