import { Exclude, Expose, Type } from "class-transformer";
import { MemeDragboxDatasEntity } from "./meme-dragbox-datas.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Meme } from "../schemas/meme.schema";
import { DragboxDatas } from "../memes.types";


@Exclude()
export class MemeEntity {
    @ApiProperty({
        name: 'id',
        description: 'Unique identifier in the database',
        example: '5763cd4dc378a38ecd387737'
    })
    @Expose()
    @Type(() => String)
    id: string;

    @ApiPropertyOptional({
        name: 'id_blank',
        description: 'Unique identifier of the blank meme in the database',
        example: '5763cd4dc378a38ecd387737'
    })
    @Expose()
    @Type(() => String)
    id_blank: string;

    @ApiProperty({
        name:"title",
        example: 'Two buttons customized by me'
    })
    @Expose()
    @Type(() => String)
    title: string;
    
    @ApiPropertyOptional({
        name:"description",
        example: 'This is my version of the two buttons meme. I hope you enjoy it'
    })
    @Expose()
    @Type(() => String)
    description: string;

    @ApiPropertyOptional({
        name:"path",
        example:"/upload/blank/653705a7fbbb4423c8b9744f.jpg"
    })
    @Expose()
    @Type(() => String)
    path: string;

    @ApiProperty()
    @Expose()
    @Type(() => MemeDragboxDatasEntity)
    dragboxesDatas: MemeDragboxDatasEntity[];

    constructor(partial: Partial<Meme>) {
        this.id = partial._id;
        this.id_blank = partial.id_blank
        this.title = partial.title;
        this.description = partial.description;
        this.path = partial.path;
        this.dragboxesDatas = partial.dragboxesDatas.map((datas) => ({id: datas._id, left: datas.left, top: datas.top, rot: datas.rot, width: datas.width, height: datas.height, content: datas.content || ""}))
    }
}