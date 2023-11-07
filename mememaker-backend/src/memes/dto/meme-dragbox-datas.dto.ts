import { ApiProperty } from "@nestjs/swagger";
import { IsInstance, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { DragboxContentDatasDTO } from "./dragbox-content-datas.dto";
import { Type } from "class-transformer";

export class MemeDragboxDatasDTO {
    @ApiProperty({
        description: "The left css property for the position of the dragbox on the meme",
        example: 40
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
        description: "Content datas inside the dragbox",
        example: 'PRESS THE RIGHT BUTTON'
    })
    @IsNotEmpty()
    @IsInstance(DragboxContentDatasDTO)
    @ValidateNested()
    @Type(() => DragboxContentDatasDTO)
    contentDatas: DragboxContentDatasDTO;

}