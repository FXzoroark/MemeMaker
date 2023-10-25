import { DragboxData } from "./dragboxData.type"

export type Meme = {
    id?: string;
    id_blank?: string;
    title: string;
    description?: string;
    path?: string;
    dragboxesDatas: DragboxData[];
}