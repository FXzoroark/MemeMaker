import { ArrayMaxSize, ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, Length, Max, MaxLength, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { MemeDragboxDatasDTO } from "./meme-dragbox-datas.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMemeDTO {
    @ApiProperty({
        description: 'Unique identifier of the blank meme in the database',
        example: '5763cd4dc378a38ecd387737'
    })
    @IsMongoId()
    @IsNotEmpty()
    id_blank: string;

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