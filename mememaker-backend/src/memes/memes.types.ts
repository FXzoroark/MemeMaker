export type Meme = {
    id: string;
    id_blank?: string;
    title: string;
    description?: string;
    path?: string
    dragboxesDatas: DragboxDatas[];
}

export type DragboxDatas = {
    id: string;
    left: number;
    top: number;
    rot: number;
    width: number;
    height: number;
    content?: string;
};