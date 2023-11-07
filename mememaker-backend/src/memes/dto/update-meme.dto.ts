import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsOptional, IsString, Length, MaxLength, ValidateNested } from "class-validator";
import { MemeDragboxDatasDTO } from "./meme-dragbox-datas.dto";

export class UpdateMemeDTO {
    @ApiProperty({
        example: 'Two buttons customized by me'
    })
    @IsString()
    @Length(2, 64)
    title: string;

    @ApiPropertyOptional({
        example: 'This is my version of the two buttons meme. I hope you enjoy it'
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

    @ApiProperty()
    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @Type(() => MemeDragboxDatasDTO)
    dragboxesDatas: MemeDragboxDatasDTO[];
    
}