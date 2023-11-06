import { ArrayMaxSize, ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, Length, Max, MaxLength, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { MemeDragboxDatasDTO } from "./meme-dragbox-datas.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateBlankMemeDTO {

    @ApiProperty({
        example: 'Two buttons'
    })
    @IsString()
    @Length(2, 64)
    title: string;

    @ApiProperty()
    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @Type(() => MemeDragboxDatasDTO)
    dragboxesDatas: MemeDragboxDatasDTO[];
}