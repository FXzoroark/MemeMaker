import { DragboxDatas } from "./dragboxDatas.type"

export type Meme = {
    id?: string;
    id_blank?: string;
    title: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    path?: string;
    dragboxesDatas: DragboxDatas[];
}